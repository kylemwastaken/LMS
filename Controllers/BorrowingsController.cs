using Microsoft.AspNetCore.Mvc;
using LMS.Data;
using LMS.Models;
using LMS.DTOs;
using Microsoft.AspNetCore.Authorization;

namespace LMS.Controllers;

[ApiController]
[Route("api/[controller]")]
public class BorrowingsController : ControllerBase
{
    private readonly LibraryContext _context;
    public BorrowingsController(LibraryContext context) => _context = context;

    [HttpPost("borrow")]
   // [Authorize(Roles = "Member")] // Only Members can borrow books
    public IActionResult BorrowBook([FromBody] BorrowingDto dto)
    {
        var member = _context.Members.Find(dto.MemberId);
        var book = _context.Books.Find(dto.BookId);

        if (book == null || member == null) return NotFound(new { message = "Member or Book not found" });
        if (book.AvailableCopies <= 0) return BadRequest("No copies available");

        var borrowing = new Borrowing
        {
            MemberId = dto.MemberId,
            BookId = dto.BookId,
            BorrowDate = DateTime.Now,
            DueDate = DateTime.Now.AddDays(14)
        };

        book.AvailableCopies--;
        _context.Borrowings.Add(borrowing);
        _context.SaveChanges();

        return Ok(new { message = "Book borrowed successfully", borrowingId = borrowing.BorrowingId });
    }

    [HttpPost("return/{borrowingId}")] 
   // [Authorize(Roles = "Member")] // Only Members can return books
    public IActionResult ReturnBook(int borrowingId)
    {
        var borrowing = _context.Borrowings.Find(borrowingId);
        if (borrowing == null) return NotFound(new { message = "Borrowing record not found" });
        if (borrowing.ReturnDate != null) return BadRequest(new { message = "Book already returned" });

        borrowing.ReturnDate = DateTime.Now;
        var book = _context.Books.Find(borrowing.BookId);
        if (book == null) return NotFound();
        book.AvailableCopies++;

        // Fine calculation
        if (borrowing.ReturnDate > borrowing.DueDate)
        {
            var daysLate = (borrowing.ReturnDate.Value - borrowing.DueDate).Days;
            var fine = new Fine
            {
                BorrowingId = borrowingId,
                Amount = daysLate * 10 // e.g., $10 per day 
            
            };
            _context.Fines.Add(fine);
        }

        _context.SaveChanges();
        return Ok(new { message = "Book returned", borrowing });
    }
}
