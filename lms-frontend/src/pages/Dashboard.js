import React from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
import { useAuth } from "../contexts/AuthContext";

function Dashboard() {
  const navigate = useNavigate();
  const { role, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/");
  }

  return (
    <div className="dashboard-container">
      <h2>Dashboard</h2>
      <p>Select a section to continue:</p>
      <div className="dashboard-buttons">
        <button onClick={() => navigate("/books")}>Books</button>
        <button onClick={() => navigate("/borrowings")}>Borrowings</button>
        <button onClick={() => navigate("/fines")}>Fines</button>

        <button onClick={handleLogout}>Logout</button>


       {/* {role === "Admin" && (
          <>
            <button onClick={() => navigate("/admin/books")}>Manage Books</button>
            <button onClick={() => navigate("/admin/borrowings")}>View All Borrowings</button>
          </>
        )} */}
      </div>
    </div>
  );
}

export default Dashboard;
