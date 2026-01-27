using Microsoft.AspNetCore.Mvc;
using LMS.Data;
using LMS.Models;

namespace LMS.Controllers;

[ApiController]
[Route("api/[controller]")]
public class BorrowingsController : ControllerBase
{
    private readonly LibraryContext _context;
    public BorrowingsController(LibraryContext context) => _context = context;

    [HttpPost("borrow")]
    public IActionResult BorrowBook(int memberId, int bookId)
    {
        var member = _context.Members.Find(memberId);
        var book = _context.Books.Find(bookId);

        if (book == null || member == null) return NotFound();
        if (book.AvailableCopies <= 0) return BadRequest("No copies available");

        var borrowing = new Borrowing
        {
            MemberId = memberId,
            BookId = bookId,
            DueDate = DateTime.Now.AddDays(14)
        };

        book.AvailableCopies--;
        _context.Borrowings.Add(borrowing);
        _context.SaveChanges();

        return Ok(borrowing);
    }

    [HttpPost("return/{borrowingId}")]
    public IActionResult ReturnBook(int borrowingId)
    {
        var borrowing = _context.Borrowings.Find(borrowingId);
        if (borrowing == null) return NotFound();

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
