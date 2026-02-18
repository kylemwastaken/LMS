
using Microsoft.AspNetCore.Mvc;
using LMS.Data;
using LMS.Models;
using LMS.DTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;

namespace LMS.Controllers;

[ApiController]
[Route("api/[controller]")]
public class BooksController : ControllerBase
{
    private readonly LibraryContext _context;

    public BooksController(LibraryContext context)
    {
        _context = context;
    }

    [HttpPost]
    [Authorize(Roles = "Admin,Librarian")] //  Only Librarians and Admins can add books
    public IActionResult AddBook([FromBody] BookDto dto)
    {
        if (string.IsNullOrEmpty(dto.ISBN) || dto.TotalCopies <= 0)
            return BadRequest(new { message = "ISBN and TotalCopies are required" });

        var book = new Book
        {
            ISBN = dto.ISBN,
            Title = dto.Title,
            Author = dto.Author,
            Category = dto.Category,
            TotalCopies = dto.TotalCopies,
            AvailableCopies = dto.TotalCopies
        };

        _context.Books.Add(book);
        _context.SaveChanges();

        return Ok(book);
    }

     [HttpGet]
    public IActionResult GetBooks()
    {
        var books = _context.Books.ToList();
        return Ok(books);
    }

    // ✅ GET: api/books/{id}
    [HttpGet("{id}")]
    public IActionResult GetBook(int id)
    {
        var book = _context.Books.Find(id);
        if (book == null)
            return NotFound(new { message = "Book not found" });

        return Ok(book);
    }

    [HttpGet("browse/{category}")]
    public async Task<IActionResult> BrowseBooks(BookCategory category)
    {
         var books = await _context.Books
             .Where(b => b.Category == category)
             .ToListAsync();

         return Ok(books);
    }



}

