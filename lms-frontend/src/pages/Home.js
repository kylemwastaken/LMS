import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <h1>Library Management System</h1>
      <p>Welcome! Choose where you’d like to go:</p>
      <ul>
        <li><Link to="/books">📚 Books</Link></li>
        <li><Link to="/borrowings">📖 Borrowings</Link></li>
        <li><Link to="/fines">💰 Fines</Link></li>
        <li><Link to="/login">🔑 Login</Link></li>
        <li><Link to="/register">📝 Register</Link></li>
      </ul>
    </div>
  );
}

export default Home;
