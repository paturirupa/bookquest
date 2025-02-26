import React from "react";
import { useLocation } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import "../css/carousel.css";

export default function BookDetails() {
  const location = useLocation();
  const { book } = location.state || {};

  if (!book) {
    return <div>No book details found.</div>;
  }

  const bookImage = book.imageUrl || book.cover;

  return (
    <div style={{ backgroundColor: "#F4F1E1", minHeight: "100vh" }}>
      <NavBar setSearchTerm={() => {}} />
      <div className="book-details-container">
        <div className="book-image-container">
          {/* Book Image */}
          {bookImage && (
            <img
              src={bookImage}
              alt={book.title}
              className="book-image"
            />
          )}
          {/* Want to Read Button */}
          <button className="want-to-read-btn">Want to Read</button>
        </div>

        <div className="book-info-container">
          {/* Combined Description and Reviews Section */}
          <div className="info-and-reviews">
            {/* Book Information */}
            <div className="book-info">
              <h1 className="book-title">{book.title}</h1>
              <h3 className="book-author">{book.author}</h3>
              <div className="book-description">
                <p>{book.description}</p>
              </div>
              {book.ratings && (
                <div className="rating-badge">
                  <strong>{book.ratings} / 5</strong>
                </div>
              )}
              {book.ISBNnumber && <p><strong>ISBN:</strong> {book.ISBNnumber}</p>}
              {book.publisher && <p><strong>Publisher:</strong> {book.publisher}</p>}
              {book.publishedYear && <p><strong>Published Year:</strong> {book.publishedYear}</p>}
            </div>

            {/* Reviews Section */}
            {book.reviews && book.reviews.length > 0 && (
              <div className="reviews-container">
                <h2>Reviews</h2>
                <div className="reviews-list">
                  {book.reviews.map((review, index) => (
                    <div key={index} className="review">
                      <p><strong>User:</strong> {review.user}</p>  {/* ✅ Fixed Key */}
                      <p><strong>Comment:</strong> {review.content}</p>  {/* ✅ Fixed Key */}
                      <p><strong>Rating:</strong> {review.rating} / 5</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
      <style>
        {`
          .book-details-container {
            display: flex;
            align-items: flex-start;
            justify-content: space-between;
            padding: 40px;
            max-width: 1200px;
            margin: 0 auto;
          }
          .book-image-container {
            flex: 0 0 30%; /* Image takes up 30% of the width */
            margin-right: 20px;
            text-align: center;
          }
          .book-image {
            width: 100%;
            height: auto;
            object-fit: cover;
            border-radius: 10px;
            box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
          }
          .want-to-read-btn {
            margin-top: 20px;
            padding: 10px 20px;
            background-color: #4c6b3c; /* Woody green */
            border: none;
            border-radius: 5px;
            font-size: 1.2rem;
            cursor: pointer;
            font-weight: bold;
            transition: background-color 0.3s ease;
            color: white;
          }
          .want-to-read-btn:hover {
            background-color: #3a5430; /* Darker woody green */
          }
          .book-info-container {
            flex: 1;
            display: flex;
            flex-direction: column;
            gap: 20px;
          }
          .info-and-reviews {
            background-color: #f1f0e4; /* Slightly less yellow */
            padding: 20px;
            border-radius: 15px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          }
          .book-info {
            margin-bottom: 20px;
          }
          .book-title {
            font-size: 2.5rem;
            font-weight: bold;
            color: #333;
          }
          .book-author {
            font-size: 1.5rem;
            color: #666;
          }
          .book-description p {
            font-size: 1.1rem;
            line-height: 1.6;
            color: #444;
          }
          .rating-badge {
            background-color: #ffdd57;
            color: black;
            font-weight: bold;
            padding: 8px 12px;
            border-radius: 5px;
            display: inline-block;
          }

          /* Reviews Section */
          .reviews-container {
            background-color: #f1f0e4; /* Slightly less yellow */
            margin-top: 30px;
            padding: 20px;
            border-radius: 12px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          }
          .reviews-container h2 {
            font-size: 2rem;
            color: #333;
            margin-bottom: 20px;
          }
          .reviews-list {
            max-height: 250px; /* Limit height of review list */
            overflow-y: auto; /* Make reviews scrollable internally */
          }
          .review {
            background-color: rgba(255, 255, 255, 0.9); /* Semi-transparent background */
            padding: 15px;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            margin-bottom: 15px;
          }
          .review p {
            font-size: 1rem;
            color: #555;
          }
        `}
      </style>
    </div>
  );
}
