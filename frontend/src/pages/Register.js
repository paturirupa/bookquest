import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const validatePassword = (password) => {
    const passwordPattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%?&])[A-Za-z\d@$!%?&]{8,}$/;
    return passwordPattern.test(password);
  };

  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const age = calculateAge(dob);

    if (!validateEmail(email)) {
      setError("Invalid email format.");
    } else if (username.length < 8) {
      setError("Username must be at least 8 characters.");
    } else if (!validatePassword(password)) {
      setError(
        "Password must be at least 8 characters, contain an uppercase letter, a number, and a special character."
      );
    } else if (password !== confirmPassword) {
      setError("Password and Confirm Password do not match.");
    } else {
      setError("");

      const userData = {
        username,
        email,
        password,
        age,
      };

      try {
        const response = await fetch(
          "http://localhost:5000/api/users/register",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
          }
        );

        if (response.ok) {
          navigate("/login");
        } else {
          setError("Registration failed. Please try again.");
        }
      } catch (error) {
        setError("Error connecting to the server.");
      }
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.overlay}></div>
      <div style={styles.registerBox}>
        <h2>Register for BookQuest</h2>
        {error && <p style={styles.error}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <div style={styles.inputGroup}>
            <label htmlFor="email" style={styles.label}>
              Email
            </label>
            <input
              type="text"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
              required
            />
          </div>
          <div style={styles.inputGroup}>
            <label htmlFor="dob" style={styles.label}>
              Date of Birth
            </label>
            <input
              type="date"
              id="dob"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              style={styles.input}
              required
            />
          </div>
          <div style={styles.inputGroup}>
            <label htmlFor="username" style={styles.label}>
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={styles.input}
              required
            />
          </div>
          <div style={styles.inputGroup}>
            <label htmlFor="password" style={styles.label}>
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
              required
            />
          </div>
          <div style={styles.inputGroup}>
            <label htmlFor="confirmPassword" style={styles.label}>
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              style={styles.input}
              required
            />
          </div>
          <button type="submit" style={styles.button}>
            Register
          </button>
        </form>
        <p style={styles.link}>
          Already have an account?{" "}
          <a href="/login" style={styles.linkAnchor}>
            Sign In here
          </a>
          .
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    backgroundImage:
      "url('https://i.pinimg.com/originals/67/18/22/671822c2f63dd5f65d8fd15c9710420b.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    padding: "20px",
    boxSizing: "border-box",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    zIndex: 1,
  },
  registerBox: {
    position: "relative",
    zIndex: 2,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    padding: "40px 30px",
    borderRadius: "10px",
    width: "400px",
    maxWidth: "100%",
    textAlign: "center",
    boxShadow: "0px 10px 15px rgba(0, 0, 0, 0.2)",
    backdropFilter: "blur(10px)",
    WebkitBackdropFilter: "blur(10px)",
  },
  error: {
    color: "red",
    marginBottom: "20px",
  },
  inputGroup: {
    marginBottom: "15px",
    textAlign: "left",
  },
  label: {
    display: "block",
    fontWeight: "600",
    marginBottom: "8px",
    fontSize: "14px",
  },
  input: {
    width: "100%",
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    boxSizing: "border-box",
    backgroundColor: "#fff",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    color: "#000",
  },
  dateInput: {
    width: "100%",
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    boxSizing: "border-box",
    backgroundColor: "#fff",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    color: "#000", // Text color in the date input field
    appearance: "none",
    // Custom styling for the date picker calendar icon
    "::-webkit-calendar-picker-indicator": {
      filter: "invert(0%)", // Ensure the calendar icon is visible and matches the input color
    },
  },
  button: {
    backgroundColor: "#28a745",
    color: "#fff",
    padding: "12px 20px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    width: "100%",
    fontSize: "16px",
    fontWeight: "bold",
    transition: "background-color 0.3s ease",
  },
  link: {
    marginTop: "20px",
    fontSize: "14px",
    color: "#007bff",
  },
  linkAnchor: {
    color: "#007bff",
    textDecoration: "none",
    fontWeight: "500",
  },
};

if (window.innerWidth <= 768) {
  styles.registerBox.width = "90%";
  styles.registerBox.padding = "30px";
}

if (window.innerWidth <= 480) {
  styles.registerBox.width = "100%";
  styles.registerBox.padding = "20px";
  styles.input.padding = "10px";
  styles.button.padding = "10px 16px";
}

if (window.innerWidth <= 768) {
  styles.registerBox.width = "90%";
  styles.registerBox.padding = "30px";
}

if (window.innerWidth <= 480) {
  styles.registerBox.width = "100%";
  styles.registerBox.padding = "20px";
  styles.input.padding = "10px";
  styles.button.padding = "10px 16px";
}
