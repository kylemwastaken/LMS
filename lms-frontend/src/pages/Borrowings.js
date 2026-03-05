import React, { useEffect, useState } from "react";
import api from "../services/api";
import "./Borrowings.css";

function Borrowings() {
  const [form, setForm] = useState({ memberId: "", bookId: "" });
  const [returnId, setReturnId] = useState("");
  const [message, setMessage] = useState("");
  const [lastBorrowing, setLastBorrowing] = useState(null);

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

      <p>{message}</p>
    </div>
  );
}



export default Borrowings;
