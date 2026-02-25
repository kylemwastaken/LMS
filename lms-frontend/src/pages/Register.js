import React, { useState } from "react";
import api from "../services/api";

function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "Member" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/Auth/register", form);
      setMessage(res.data?.message || "Registration successful! You can now log in.");
    } catch (err) {
      // log full error for debugging
      console.error(err.response ? err.response.data : err.message);
      const serverMsg = err.response?.data?.message;
      setMessage(serverMsg ? `Registration failed: ${serverMsg}` : "Registration failed.");
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="name"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
        />
        <br />
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
      {/*  <br />
        <select name="role" value={form.role} onChange={handleChange}>
          <option value="Member">Member</option>
          <option value="Librarian">Librarian</option>
          <option value="Admin">Admin</option>
        </select>*/}
        <br /> 
        <button type="submit">Register</button>
      </form>
      <p>{message}</p>
    </div>
  );
}

export default Register;
