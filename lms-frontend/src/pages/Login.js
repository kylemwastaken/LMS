import React, { useState } from "react";
import api from "../services/api";
import "./Login.css";
import { Link } from "react-router-dom";


function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/Auth/login", form);
      setMessage("Login successful!");
      setIsSuccess(true);
      localStorage.setItem("token", res.data.token);
    } catch (err) {
      console.error(err.response ? err.response.data : err.message);
      const serverMsg = err.response?.data?.message;
      setMessage(serverMsg ? `Login failed: ${serverMsg}` : "Login failed. Check credentials.");
      setIsSuccess(false);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
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
        <button type="submit">Login</button>
      </form>
       <p>
        Don't have an account? <Link to="/register">Register here</Link>
      </p>

      <p className={isSuccess ? "success" : "error"}>{message}</p>
    </div>
  );
}


export default Login;
