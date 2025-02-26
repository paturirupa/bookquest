import React from "react";
import { useNavigate } from "react-router-dom";

const fontStyle = {
  fontFamily: "'Roboto', sans-serif",
};

export default function HomePage() {
  const navigate = useNavigate();

  const backgroundImage =
    "https://watermark.lovepik.com/photo/20211120/large/lovepik-a-flying-bird-with-the-pages-of-a-book-picture_500504807.jpg";

  const handleLogin = (e) => {
    e.preventDefault();
    navigate("/login");
  };

  const handleRegister = (e) => {
    e.preventDefault();
    navigate("/register");
  };

  const styles = {
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh",
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      padding: "20px",
      position: "relative",
    },
    overlay: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0, 0, 0, 0.6)",
      zIndex: -1,
    },
    contentContainer: {
      background: "rgba(255, 255, 255, 0.9)",
      padding: "40px",
      borderRadius: "10px",
      boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
      maxWidth: "800px",
      width: "100%",
      zIndex: 1,
      position: "relative",
      textAlign: "center",
    },
    title: {
      marginBottom: "20px",
      fontSize: "2.5rem",
      color: "#333",
      ...fontStyle,
    },
    subtitle: {
      marginBottom: "30px",
      fontSize: "1.5rem",
      color: "#666",
      ...fontStyle,
    },
    button: {
      padding: "12px 20px",
      backgroundColor: "#4A90E2",
      color: "#fff",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      fontSize: "1rem",
      transition: "background-color 0.3s",
      margin: "0 10px",
      ...fontStyle,
    },
    buttonHover: {
      backgroundColor: "#357ABD",
    },
    link: {
      color: "#4A90E2",
      textDecoration: "none",
      display: "block",
      fontSize: "0.9rem",
      marginTop: "10px",
      ...fontStyle,
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.overlay}></div>
      <div style={styles.contentContainer}>
        <h1 style={styles.title}>Welcome to BookQuest</h1>
        <p style={styles.subtitle}>
          Explore, Discover, and Read your next favorite book!
        </p>
        <div>
          <button
            style={styles.button}
            onMouseEnter={(e) =>
              (e.target.style.backgroundColor =
                styles.buttonHover.backgroundColor)
            }
            onMouseLeave={(e) =>
              (e.target.style.backgroundColor = styles.button.backgroundColor)
            }
            onClick={handleLogin}
          >
            Sign In
          </button>
          <button
            style={styles.button}
            onMouseEnter={(e) =>
              (e.target.style.backgroundColor =
                styles.buttonHover.backgroundColor)
            }
            onMouseLeave={(e) =>
              (e.target.style.backgroundColor = styles.button.backgroundColor)
            }
            onClick={handleRegister}
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
}
