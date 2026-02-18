namespace LMS.Models;

public class Book
{
    public int BookId { get; set; }
    public string ISBN { get; set; } = string.Empty;
    public string Title { get; set; } = string.Empty;
    public string Author { get; set; } = string.Empty;
    public BookCategory Category { get; set; } 
    public int TotalCopies { get; set; }
    public int AvailableCopies { get; set; }
}



