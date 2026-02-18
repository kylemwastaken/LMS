using Microsoft.EntityFrameworkCore;
using LMS.Models;

namespace LMS.Data;

public class LibraryContext : DbContext
{
    public LibraryContext(DbContextOptions<LibraryContext> options) : base(options) { }

    public DbSet<Book> Books { get; set; }
    public DbSet<Member> Members { get; set; }
    public DbSet<Borrowing> Borrowings { get; set; }
    public DbSet<Fine> Fines { get; set; }
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Book>()
            .Property(b => b.Category)
            .HasConversion<string>();   // ✅ store enum as string in DB
    }
}

