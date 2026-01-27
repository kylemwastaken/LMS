using Microsoft.AspNetCore.Mvc;
using LMS.Data;
using LMS.Models;

namespace LMS.Controllers;

[ApiController]
[Route("api/[controller]")]
public class BooksController : ControllerBase
{
    private readonly LibraryContext _context;
    public BooksController(LibraryContext context) => _context = context;

    [HttpGet]
    public IActionResult GetBooks(string? search)
    {
        var books = string.IsNullOrEmpty(search)
            ? _context.Books.ToList()
            : _context.Books.Where(b => b.Title.Contains(search)).ToList();
        return Ok(books);
    }

    [HttpPost]
    public IActionResult AddBook(Book book)
    {
        _context.Books.Add(book);
        _context.SaveChanges();
        return Ok(book);
    }
}
