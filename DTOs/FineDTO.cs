using System;

namespace LMS.DTOs;

 public class FineDto
    {
        //public int MemberId { get; set; }
        public int BorrowingId { get; set; }
        public decimal Amount { get; set; }
    }

 public class PayFineDto
    {
        public int FineId { get; set; }
    }
