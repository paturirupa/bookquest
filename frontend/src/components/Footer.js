import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  const styles = {
    footer: {
      backgroundColor: "#f9f4e7",
      padding: "20px 0",
      borderTop: "1px solid #ddd",
    },
    nav: {
      listStyleType: "none",
      display: "flex",
      justifyContent: "center",
      padding: 0,
      marginBottom: "15px",
    },
    navItem: {
      margin: "0 10px",
    },
    navLink: {
      textDecoration: "none",
      color: "#000",
      fontSize: "16px",
      fontWeight: "500",
      transition: "color 0.3s",
    },
    navLinkHover: {
      color: "#333",
    },
    textMuted: {
      color: "#000",
    },
  };

  return (
    <div>
      <footer style={styles.footer}>
        <ul style={styles.nav}>
          <li style={styles.navItem}>
            <Link to="/" style={styles.navLink}>
              Home
            </Link>
          </li>
          <li style={styles.navItem}>
            <Link to="/features" style={styles.navLink}>
              Features
            </Link>
          </li>
          <li style={styles.navItem}>
            <Link to="/pricing" style={styles.navLink}>
              Pricing
            </Link>
          </li>
          <li style={styles.navItem}>
            <Link to="/faqs" style={styles.navLink}>
              FAQs
            </Link>
          </li>
          <li style={styles.navItem}>
            <Link to="/about" style={styles.navLink}>
              About
            </Link>
          </li>
        </ul>
        <p className="text-center" style={styles.textMuted}>
          © 2024 Book Quest
        </p>
      </footer>
    </div>
  );
}
