import React, { useState } from "react";
import api from "../services/api";
import "./Register.css";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";


function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "", confirmPassword: "", role: "Member" });
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }



  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      setMessage("Passwords do not match.");
      setIsSuccess(false);
      return;
    }
    try {
      const res = await api.post("/Auth/register", form);
      setMessage(res.data?.message || "Registration successful! You can now log in.");
      setIsSuccess(true);
      navigate("/login");
    } catch (err) {
      console.error(err.response ? err.response.data : err.message);
      const serverMsg = err.response?.data?.message;
      setMessage(serverMsg ? `Registration failed: ${serverMsg}` : "Registration failed.");
      setIsSuccess(false);
    }
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
        />
        <input
         type="password"
         name="confirmPassword"
         placeholder="Confirm Password"
         value={form.confirmPassword}
         onChange={handleChange}
        />

        <button type="submit">Register</button>
      </form>
      <p>
        Already have an account? <Link to="/login">Login here</Link>
      </p>


      <p className={isSuccess ? "success" : "error"}>{message}</p>
    </div>
  );
}



export default Register;
