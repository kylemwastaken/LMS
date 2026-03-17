import React, { useEffect, useState } from "react";
import api from "../services/api";
import "./Fines.css";



function Fines() {
  const [fines, setFines] = useState([]);
  const [newFine, setNewFine] = useState({ borrowingId: "", amount: "" });
  const [payId, setPayId] = useState("");
  const [searchBorrowingId, setSearchBorrowingId] = useState("");
  const [message, setMessage] = useState("");
  const role = localStorage.getItem("role");

  // View all fines
  useEffect(() => {
    api.get("/fines")
      .then(res => setFines(res.data))
      .catch(err => console.error("Error fetching fines:", err));
  }, []);

  // Issue a fine
  const handleIssueFine = async (e) => {
    e.preventDefault();
    try {
      // backend expects POST /fines/issue with FineDto { borrowingId, amount }
      const dto = {
        borrowingId: parseInt(newFine.borrowingId, 10),
        amount: parseFloat(newFine.amount),
      };
      const res = await api.post("/fines/issue", dto);
      setMessage("Fine issued successfully!");
      setFines([...fines, res.data]);
      setNewFine({ borrowingId: "", amount: "" });
    } catch (err) {
      setMessage("Failed to issue fine.");
    }
  };

  // Pay a fine
  const handlePayFine = async () => {
    try {
      // API uses POST /fines/pay with { fineId }
      await api.post(`/fines/pay`, { fineId: parseInt(payId, 10) });
      setMessage("Fine paid successfully!");
      setPayId("");
      // Refresh fines list
      const res = await api.get("/fines");
      setFines(res.data);
    } catch (err) {
      setMessage("Failed to pay fine.");
    }
  };

  // Search by Borrowing ID
  const handleSearchByBorrowingId = async () => {
    try {
      const res = await api.get(`/fines/borrowing/${searchBorrowingId}`);
      setFines(res.data);
    } catch (err) {
      setMessage("No fines found for this borrowing.");
    }
  };

  return (
    <div className="fines-container">
      <h2>Fines</h2>

      {/* Issue Fine Form */}
      <form onSubmit={handleIssueFine}>
        <input
          type="text"
          name="borrowingId"
          placeholder="Borrowing ID"
          value={newFine.borrowingId}
          onChange={(e) => setNewFine({ ...newFine, borrowingId: e.target.value })}
        />
        <input
          type="number"
          name="amount"
          placeholder="Amount"
          value={newFine.amount}
          onChange={(e) => setNewFine({ ...newFine, amount: e.target.value })}
        />
        <button type="submit">Issue Fine</button>
      </form>

      {/* Pay Fine */}
      <div>
        <input
          type="text"
          placeholder="Fine ID"
          value={payId}
          onChange={(e) => setPayId(e.target.value)}
        />
        <button onClick={handlePayFine}>Pay Fine</button>
      </div>

      {/* Search by Borrowing ID */}
      <div>
        <input
          type="text"
          placeholder="Search by Borrowing ID"
          value={searchBorrowingId}
          onChange={(e) => setSearchBorrowingId(e.target.value)}
        />
        <button onClick={handleSearchByBorrowingId}>Search</button>
      </div>

      {/* Reset / Show all fines */}
      {role === "Admin" && (
        <div>
          <button
            onClick={() => {
              setMessage("");
              api.get("/fines").then(res => setFines(res.data));
            }}
          >
            Show All Fines
          </button>
        </div>
      
          
        )}

      {/* Fines List */}
      <ul>
        {fines.map(f => (
          <li key={f.fineId}>
            <span>
              Fine #{f.fineId} — Borrowing {f.borrowingId} — Amount: {f.amount}
            </span>
            <span className={f.isPaid ? "status-paid" : "status-unpaid"}>
              {f.isPaid ? "Paid" : "Unpaid"}
            </span>
          </li>
        ))}
      </ul>

      <p>{message}</p>
    </div>
  );
}


export default Fines;
