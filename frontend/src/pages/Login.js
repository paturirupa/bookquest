import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const users = [
    { username: "supraja", password: "sup@12345" },
    { username: "sangeetha", password: "Sangee@135" },
    { username: "siri", password: "Siri@31" },
    { username: "gayathri", password: "Gayathri@78" },
    { username: "Rupa", password: "Paturi00!" },
    { username: "sanjana", password: "sanju@123" },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = users.find(
      (user) => user.username === username && user.password === password
    );

    if (user) {
      setError("");
      navigate("/home");
    } else {
      setError("Invalid username or password.");
    }
  };

  const containerStyle = {
    position: "relative",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
    boxSizing: "border-box",
    overflow: "hidden",
    backgroundImage:
      'url("https://i.pinimg.com/originals/67/18/22/671822c2f63dd5f65d8fd15c9710420b.jpg")',
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundColor: "rgba(255, 0, 255, 0.1)",
  };

  const loginBoxStyle = {
    backgroundColor: "rgba(255, 255, 255, 0.85)",
    padding: "40px",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    width: "100%",
    maxWidth: "400px",
    textAlign: "center",
  };

  const headingStyle = {
    fontSize: "28px",
    marginBottom: "20px",
    fontWeight: "bold",
    color: "#333",
  };

  const errorStyle = {
    color: "red",
    marginBottom: "20px",
    fontSize: "16px",
  };

  const inputGroupStyle = {
    marginBottom: "20px",
  };

  const labelStyle = {
    display: "block",
    fontWeight: "bold",
    marginBottom: "8px",
    fontSize: "14px",
    textAlign: "left",
  };

  const inputStyle = {
    width: "100%",
    padding: "12px 14px",
    borderRadius: "8px",
    border: "1px solid #ddd",
    fontSize: "16px",
    backgroundColor: "transparent",
    color: "#000",
  };

  const buttonStyle = {
    backgroundColor: "#007bff",
    color: "#fff",
    padding: "12px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    width: "100%",
    fontSize: "16px",
    fontWeight: "bold",
    transition: "background-color 0.3s ease",
  };

  const linkStyle = {
    marginTop: "20px",
    fontSize: "14px",
    color: "#007bff",
  };

  return (
    <div style={containerStyle}>
      <div style={loginBoxStyle}>
        <h2 style={headingStyle}>Login to BookQuest</h2>
        {error && <p style={errorStyle}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <div style={inputGroupStyle}>
            <label htmlFor="username" style={labelStyle}>
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={inputStyle}
              required
            />
          </div>
          <div style={inputGroupStyle}>
            <label htmlFor="password" style={labelStyle}>
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={inputStyle}
              required
            />
          </div>
          <button type="submit" style={buttonStyle}>
            Sign In
          </button>
        </form>
        <p style={linkStyle}>
          Don't have an account? <a href="/register">Register here</a>.
        </p>
      </div>
    </div>
  );
}
