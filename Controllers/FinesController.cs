using LMS.Models;
using LMS.DTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using LMS.Data;

namespace LMS.Controllers;

      [ApiController]
    [Route("api/[controller]")]
    public class FinesController : ControllerBase
    {
        private readonly LibraryContext _context;

        public FinesController(LibraryContext context)
        {
            _context = context;
        }

        // Issue a fine manually
        [HttpPost("issue")]
        [Authorize(Roles = "Admin,Librarian")]
        public IActionResult IssueFine([FromBody] FineDto dto)
        {
            var fine = new Fine
            {
                BorrowingId = dto.BorrowingId,
                Amount = dto.Amount,
                Status = "Unpaid"
            };

            _context.Fines.Add(fine);
            _context.SaveChanges();

            return Ok(fine);
        }

        // Pay a fine
        [HttpPost("pay")]
        //[Authorize(Roles = "Member,Librarian,Admin")]
        public IActionResult PayFine([FromBody] PayFineDto dto)
        {
            var fine = _context.Fines.Find(dto.FineId);
            if (fine == null) return NotFound(new { message = "Fine not found" });

            fine.Status = "Paid";
            _context.SaveChanges();

            return Ok(new { message = "Fine paid successfully" });
        }

        // List all fines
        [HttpGet]
        [Authorize(Roles = "Admin,Librarian")]
        public IActionResult GetAllFines()
        {
            var fines = _context.Fines.ToList();
            return Ok(fines);
        }

        // List fines for a specific borrowing
        [HttpGet("borrowing/{borrowingId}")]
        //[Authorize(Roles = "Member,Librarian,Admin")]
        public IActionResult GetBorrowingFines(int borrowingId)
        {
            var fines = _context.Fines.Where(f => f.BorrowingId == borrowingId).ToList();
            return Ok(fines);
        }
    }

