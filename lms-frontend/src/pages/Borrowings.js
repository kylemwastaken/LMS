import React, { useEffect, useState } from "react";
import api from "../services/api";

function Borrowings() {
  const [borrowings, setBorrowings] = useState([]);

  useEffect(() => {
    api.get("/borrowings")
      .then(res => setBorrowings(res.data))
      .catch(err => console.error("Error fetching borrowings:", err));
  }, []);

  return (
    <div>
      <h2>Borrowings</h2>
      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>ID</th>
            <th>Member</th>
            <th>Book</th>
            <th>Borrow Date</th>
            <th>Due Date</th>
            <th>Return Date</th>
          </tr>
        </thead>
        <tbody>
          {borrowings.map(b => (
            <tr key={b.borrowingId}>
              <td>{b.borrowingId}</td>
              <td>{b.memberId}</td>
              <td>{b.bookId}</td>
              <td>{new Date(b.borrowDate).toLocaleDateString()}</td>
              <td>{new Date(b.dueDate).toLocaleDateString()}</td>
              <td>{b.returnDate ? new Date(b.returnDate).toLocaleDateString() : "Not returned"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Borrowings;
