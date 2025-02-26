import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

export default function BookDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const { book } = location.state || {};

  // Redirect to home if no book data is found
  if (!book) {
    navigate("/");
    return null;
  }

  return (
    <div style={{ backgroundColor: "#FFFDD0", minHeight: "100vh" }}>
      <NavBar />
      <div className="book-details-container">
        <img src={book.image} alt={book.title} className="book-details-image" />
        <div className="book-details-content">
          <h1>{book.title}</h1>
          <h3>By {book.author}</h3>
          <p>{book.description}</p>
          <p>{book.publisher}</p>
          <p><strong>Trending:</strong> {book.trendingInfo}</p>
        </div>
      </div>
      <Footer />
      <style>
        {`
          .book-details-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 20px;
          }
          .book-details-image {
            width: 300px;
            height: 450px;
            object-fit: cover;
            border-radius: 10px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
            margin-bottom: 20px;
          }
          .book-details-content {
            max-width: 600px;
            text-align: center;
          }
          h1 {
            font-size: 2em;
            margin-bottom: 10px;
          }
          h3 {
            font-size: 1.5em;
            margin-bottom: 20px;
            color: #555;
          }
          p {
            font-size: 1em;
            color: #333;
            margin-bottom: 10px;
          }
        `}
      </style>
    </div>
  );
}
