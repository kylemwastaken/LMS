import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Books from "./pages/Books";
import Fines from "./pages/Fines";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Borrowings from "./pages/Borrowings";
import Home from "./pages/Home";
import "./App.css";
import { NavLink } from "react-router-dom";



function App() {
  return (
    <Router>
      
<nav className="navbar">
  <NavLink to="/" end>Home</NavLink>
  <NavLink to="/books">Books</NavLink>
  <NavLink to="/borrowings">Borrowings</NavLink>
  <NavLink to="/fines">Fines</NavLink>
  <NavLink to="/login">Login</NavLink>
  <NavLink to="/register">Register</NavLink>
</nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/books" element={<Books />} />
        <Route path="/borrowings" element={<Borrowings />} />
        <Route path="/fines" element={<Fines />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}


export default App;