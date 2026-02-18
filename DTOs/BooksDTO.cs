using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using LMS.Models;

namespace LMS.DTOs;

public class BookDto
{
    [Required]
    [RegularExpression(@"^\d{13}$", ErrorMessage = "ISBN must be exactly 13 digits")]
    public string ISBN { get; set; } = string.Empty;

    [Required]
    public string Title { get; set; } = string.Empty;

    [Required]
    public string Author { get; set; } = string.Empty;

    [Required]
    [JsonConverter(typeof(JsonStringEnumConverter))]
    public BookCategory Category { get; set; }

    [Range(1, int.MaxValue, ErrorMessage = "TotalCopies must be greater than 0")]
    public int TotalCopies { get; set; }
}
