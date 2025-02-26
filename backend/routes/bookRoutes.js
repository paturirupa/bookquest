const express = require("express");
const router = express.Router();
const bookController = require("../controllers/bookController");

// Book Routes
router.post("/", bookController.createBook); // Add a new book
router.get("/", bookController.getAllBooks); // Get all books
router.get("/:id", bookController.getBookById); // Get a single book by ID
router.put("/:id", bookController.updateBook); // Update a book
router.delete("/:id", bookController.deleteBook); // Delete a book
router.post("/:id/review", bookController.addReview); // Add a review to a book
router.get("/frontend/data", bookController.fetchBooksForFrontend); // Fetch books for frontend

module.exports = router;
