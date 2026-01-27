using LMS.Models;

namespace LMS.Models;

public class Borrowing
{
    public int BorrowingId { get; set; }
    public int MemberId { get; set; }
    public Member? Member { get; set; }
    public int BookId { get; set; }
    public Book? Book { get; set; }
    public DateTime BorrowDate { get; set; } = DateTime.Now;
    public DateTime DueDate { get; set; }
    public DateTime? ReturnDate { get; set; }
}