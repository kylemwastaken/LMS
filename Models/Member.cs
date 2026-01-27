namespace LMS.Models;

public class Member
{
    public int MemberId { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string PasswordHash { get; set; } = string.Empty;
    public string Role { get; set; } = "Member"; // Admin, Librarian, Member
    public int BorrowLimit { get; set; } = 3;

    public ICollection<Borrowing>? Borrowings { get; set; }
}
