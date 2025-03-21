const Book = require("../models/Book");

// Create a new book
exports.createBook = async (req, res) => {
  try {
    const book = new Book(req.body);
    await book.save();
    res.status(201).json(book);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all books
exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a book by ID
exports.getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.json(book);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a book by ID
exports.updateBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.json(book);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a book by ID
exports.deleteBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.json({ message: "Book deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Add a review to a book
exports.addReview = async (req, res) => {
  try {
    const { user, content, rating } = req.body;
    const book = await Book.findById(req.params.id); // Use `id` instead of `_id`

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    const newReview = {
      user,
      content,
      rating: Number(rating),
      createdAt: new Date(),
    };

    book.reviews.push(newReview);
    await book.save();

    res.status(201).json({ message: "Review added successfully", review: newReview });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// ✅ Delete a review from a book
exports.deleteReview = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    // Find the review and remove it
    const updatedReviews = book.reviews.filter((review) => review._id.toString() !== reviewId);

    if (updatedReviews.length === book.reviews.length) {
      return res.status(404).json({ message: "Review not found" });
    }

    book.reviews = updatedReviews;
    await book.save();

    res.json({ message: "Review deleted successfully", reviews: book.reviews });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Fetch books data for frontend
exports.fetchBooksForFrontend = async (req, res) => {
  try {
    const books = await Book.find().select("title author imageUrl description rating reviews");
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch books data" });
  }
};
// Get all reviews for a book
exports.getBookReviews = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.json(book.reviews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

