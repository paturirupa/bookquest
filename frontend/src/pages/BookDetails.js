import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import "../css/bookDetails.css";

export default function BookDetails() {
  const location = useLocation();
  const { book } = location.state || {};
  console.log("Received book in BookDetails.js:", book);

  if (!book) {
    return <div className="no-book">No book details found.</div>;
  }

  const bookImage = book.imageUrl || book.cover;
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ user: "", content: "", rating: "" });

  // Fetch existing reviews from backend
  useEffect(() => {
    const fetchReviews = async () => {
      if (!book.id) return;
      try {
        const response = await fetch(`http://localhost:5000/api/reviews/${book._id}`);
        if (!response.ok) throw new Error("Failed to fetch reviews");

        const data = await response.json();
        setReviews(data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews();
  }, [book._id]);

  // Add new review to backend
  const handleAddReview = async () => {
    if (!newReview.user || !newReview.content || !newReview.rating) {
      alert("Please fill in all fields.");
      return;
    }

    const reviewData = {
      bookId: book.id,
      user: newReview.user,
      content: newReview.content,
      rating: Number(newReview.rating),
    };

    try {
      const response = await fetch("http://localhost:5000/api/reviews/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reviewData),
      });

      const data = await response.json();
      if (response.ok) {
        setReviews([...reviews, data.review]);
        setNewReview({ user: "", content: "", rating: "" });
      } else {
        console.error("Failed to add review:", data.message);
      }
    } catch (error) {
      console.error("Error adding review:", error);
    }
  };

  // Delete a review from backend & update UI
  const handleDeleteReview = async (reviewId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/reviews/delete/${reviewId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setReviews(reviews.filter((review) => review._id !== reviewId));
      } else {
        console.error("Failed to delete review");
      }
    } catch (error) {
      console.error("Error deleting review:", error);
    }
  };

  return (
    <div className="book-details-page">
      <NavBar setSearchTerm={() => {}} />
      <div className="book-details-container">
        <div className="book-image-container">
          {bookImage && <img src={bookImage} alt={book.title} className="book-image" />}
          <button className="want-to-read-btn">Want to Read</button>
        </div>
        <div className="book-info-container">
          <h1 className="book-title">{book.title}</h1>
          <h3 className="book-author">{book.author}</h3>
          <p className="book-description">{book.description}</p>
          {book.ratings && <div className="rating-badge">{book.ratings} / 5</div>}
          {book.ISBNnumber && <p><strong>ISBN:</strong> {book.ISBNnumber}</p>}
          {book.publisher && <p><strong>Publisher:</strong> {book.publisher}</p>}
          {book.publishedYear && <p><strong>Published Year:</strong> {book.publishedYear}</p>}
        </div>
      </div>
      <div className="reviews-container">
        <h2>Reviews</h2>
        <div className="reviews-list">
          {reviews.length > 0 ? (
            reviews.map((review) => (
              <div key={review._id} className="review">
                <p><strong>{review.user}</strong></p>
                <p>{review.content}</p>
                <p className="review-rating">{review.rating} / 5</p>
                <button className="delete-btn" onClick={() => handleDeleteReview(review._id)}>Delete</button>
              </div>
            ))
          ) : (
            <p>No reviews yet.</p>
          )}
        </div>
        <div className="add-review-container">
          <input type="text" placeholder="Your Name" value={newReview.user} onChange={(e) => setNewReview({ ...newReview, user: e.target.value })} />
          <textarea placeholder="Your Review" value={newReview.content} onChange={(e) => setNewReview({ ...newReview, content: e.target.value })}></textarea>
          <input type="number" placeholder="Rating (1-5)" min="1" max="5" value={newReview.rating} onChange={(e) => setNewReview({ ...newReview, rating: e.target.value })} />
          <button className="add-review-btn" onClick={handleAddReview}>Add Review</button>
        </div>
      </div>
      <Footer />
    </div>
  );
}