import React, { useEffect, useState } from "react";
import api from "../services/api";
import "./Borrowings.css";

function Borrowings() {
  const [form, setForm] = useState({ memberId: "", bookId: "" });
  const [returnId, setReturnId] = useState("");
  const [message, setMessage] = useState("");
  const [lastBorrowing, setLastBorrowing] = useState(null);
  const role = localStorage.getItem("role");
  const [allBorrowings, setAllBorrowings] = useState([]);



  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Borrow a book
  const handleBorrow = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/borrowings/borrow", form);
      setMessage(res.data.message || "Book borrowed successfully!");
      setLastBorrowing(res.data); // capture borrowing record
      setForm({ memberId: "", bookId: "" });
    } catch (err) {
      setMessage("Failed to borrow book.");
    }
  };

  // Return a book
  const handleReturn = async () => {
    try {
      const res = await api.post(`/borrowings/return/${returnId}`);
      setMessage(res.data.message || "Book returned successfully!");
      setReturnId("");
      setLastBorrowing(null); // clear after return
    } catch (err) {
      setMessage("Failed to return book.");
    }
  };

  // Fetch all borrowings (Admin only)
  const handleShowAllBorrowings = async () => {
  try {
    const res = await api.get("/borrowings/All");
    setAllBorrowings(res.data);
    setMessage("");
  } catch (err) {
    setMessage("Failed to fetch borrowings.");
    setAllBorrowings([]);
  }
};


  return (
    <div className="borrowings-container">
      <h2>Borrowings</h2>

      {/* Borrow Book Form */}
      <form onSubmit={handleBorrow}>
        <input
          type="text"
          name="memberId"
          placeholder="Member ID"
          value={form.memberId}
          onChange={handleChange}
        />
        <input
          type="text"
          name="bookId"
          placeholder="Book ID"
          value={form.bookId}
          onChange={handleChange}
        />
        <button type="submit">Borrow Book</button>
      </form>

      {/* Show Borrowing ID */}
      {lastBorrowing && (
        <p>
          Borrowing ID: <strong>{lastBorrowing.borrowingId}</strong>
        </p>
      )}

      {/* Return Book */}
      <div>
        <input
          type="text"
          placeholder="Borrowing ID"
          value={returnId}
          onChange={(e) => setReturnId(e.target.value)}
        />
        <button onClick={handleReturn}>Return Book</button>
      </div>

      {/* Show All Borrowings - Admin Only */}
      {role === "Admin" && (
        <div>
            <button onClick={handleShowAllBorrowings}>Show All Borrowings</button>
        </div>
    )}


      <p>{message}</p>
      {role === "Admin" && allBorrowings.length > 0 && (
          <ul>
            {allBorrowings.map(b => (
           <li key={b.borrowingId}>
               Borrowing ID: {b.borrowingId} — Book: {b.book?.title} — Member: {b.member?.name}

           </li>
          ))}
         </ul>
       )}

    </div>
  );
}



export default Borrowings;
