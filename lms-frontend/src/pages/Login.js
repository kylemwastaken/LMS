import React, { useState } from "react";
import api from "../services/api";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/Auth/login", form);
      setMessage("Login successful!");
      // Save token to localStorage for later requests
      localStorage.setItem("token", res.data.token);
    } catch (err) {
      console.error(err.response ? err.response.data : err.message);
      const serverMsg = err.response?.data?.message;
      setMessage(serverMsg
        ? `Login failed: ${serverMsg}`
        : "Login failed. Check credentials.");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />
        <br />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
        />
        <br />
        <button type="submit">Login</button>
      </form>
      <p>{message}</p>
    </div>
  );
}

export default Login;
