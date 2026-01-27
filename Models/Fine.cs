namespace LMS.Models;

public class Fine
{
    public int FineId { get; set; }
    public int BorrowingId { get; set; }
    public Borrowing? Borrowing { get; set; }
    public decimal Amount { get; set; }
    public string Status { get; set; } = "Unpaid"; // Paid/Unpaid
}
