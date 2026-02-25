import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Books from "./pages/Books";
import Fines from "./pages/Fines";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Borrowings from "./pages/Borrowings";
import Home from "./pages/Home";


function App() {
    return (
    <Router>
      <nav>
        <Link to="/">Home</Link> | 
        <Link to="/books">Books</Link> | 
        <Link to="/borrowings">Borrowings</Link> | 
        <Link to="/fines">Fines</Link> | 
        <Link to="/login">Login</Link> | 
        <Link to="/register">Register</Link>
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