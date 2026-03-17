import React from "react";
import { BrowserRouter as Router, Route, Routes, NavLink, useNavigate } from "react-router-dom";
import Books from "./pages/Books";
import Fines from "./pages/Fines";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Borrowings from "./pages/Borrowings";
import "./App.css";
import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider, useAuth } from "./contexts/AuthContext";

function AppContent() {
  const navigate = useNavigate();
  const { isAuthenticated, role, logout } = useAuth();

  return (
    <>
      <nav className="navbar">
        { !isAuthenticated && (
          <>
            <NavLink to="/" end>
              Landing Page
            </NavLink>
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/register">Register</NavLink>
          </>
        )}

        { isAuthenticated && (
          <>
            <NavLink to="/dashboard">Dashboard</NavLink>
            <NavLink to="/books">Books</NavLink>
            <NavLink to="/borrowings">Borrowings</NavLink>
            <NavLink to="/fines">Fines</NavLink>

           {/* { role === "Admin" && (
              <>
                <NavLink to="/admin/books">Manage Books</NavLink>
                <NavLink to="/admin/borrowings">View All Borrowings</NavLink>
              </>
            )}*/}

            <button
              onClick={() => {
                logout();
                navigate("/");
              }}
            >
              Logout
            </button>
          </>
        )}
      </nav>

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/books" element={<ProtectedRoute><Books /></ProtectedRoute>} />
        <Route path="/borrowings" element={<ProtectedRoute><Borrowings /></ProtectedRoute>} />
        <Route path="/fines" element={<ProtectedRoute><Fines /></ProtectedRoute>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;
