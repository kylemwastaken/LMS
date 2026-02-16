using System.ComponentModel.DataAnnotations;

namespace LMS.DTOs;

public class BookDto
{
   // [Required]
    //[RegularExpression(@"^\d{3}-\d{10}$", ErrorMessage = "ISBN must be exactly 13 digits")]
    public string ISBN { get; set; } = string.Empty;

    public string Title { get; set; } = string.Empty;
    public string Author { get; set; } = string.Empty;
    public string Category { get; set; } = string.Empty;
    public int TotalCopies { get; set; }
    //public BookCategory BookCategory { get; set; }
}
