const express = require("express");
const router = express.Router();
const bookController = require("../controllers/bookController");

// Book Routes
router.post("/", bookController.createBook); // Add a new book
router.get("/", bookController.getAllBooks); // Get all books
router.get("/:id", bookController.getBookById); // Get a single book by ID
router.put("/:id", bookController.updateBook); // Update a book
router.delete("/:id", bookController.deleteBook); // Delete a book

// Review Routes
router.post("/:id/reviews", bookController.addReview); // ✅ Add a review (changed from /review to /reviews)
router.get("/:id/reviews", bookController.getBookReviews); // ✅ Fetch all reviews for a book
router.delete("/:id/reviews/:reviewId", bookController.deleteReview); // Delete a specific review

// Fetch books for frontend
router.get("/frontend/data", bookController.fetchBooksForFrontend);

module.exports = router;
