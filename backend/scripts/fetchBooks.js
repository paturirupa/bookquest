const axios = require("axios");
const mongoose = require("mongoose");
const Book = require("../models/Book");
const Genre = require("../models/Genre");
require("dotenv").config();
require("../index"); // Importing to reuse the existing connection

const fetchBooks = async () => {
  try {
    const response = await axios.get(
      "https://www.googleapis.com/books/v1/volumes?q=subject:fiction&maxResults=40"
    );
    const books = response.data.items;

    for (let book of books) {
      const bookData = {
        title: book.volumeInfo.title,
        author: book.volumeInfo.authors?.[0] || "Unknown",
        imageUrl: book.volumeInfo.imageLinks?.thumbnail || "",
        description: book.volumeInfo.description || "No description available",
        publishedYear:
          parseInt(book.volumeInfo.publishedDate?.substring(0, 4)) || null,
        rating: book.volumeInfo.averageRating || 0,
      };

      // Genre lookup or creation
      const genreName = "Fiction";
      let genre = await Genre.findOne({ name: genreName });
      if (!genre) {
        genre = await Genre.create({ name: genreName });
        console.log(`Created new genre: "${genreName}"`);
      }
      bookData.genre = genre._id;

      // Duplicate check by title and author
      const existingBook = await Book.findOne({
        title: bookData.title,
        author: bookData.author,
      });
      if (!existingBook) {
        await Book.create(bookData);
        console.log(`Book "${bookData.title}" imported successfully!`);
      } else {
        console.log(`Book "${bookData.title}" already exists, skipping...`);
      }
    }
  } catch (error) {
    console.error("Error fetching books:", error);
  } finally {
    await mongoose.connection.close(); // Using await to close the connection without a callback
    console.log("MongoDB connection closed.");
  }
};

fetchBooks();
