import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

const BookDisplay = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [booksByGenre, setBooksByGenre] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/books");
        const data = await response.json();
        const groupedBooks = data.reduce((acc, book) => {
          const genreName = book.genre.name; // Ensure genre is an object with a name property
          if (!acc[genreName]) {
            acc[genreName] = [];
          }
          acc[genreName].push(book);
          return acc;
        }, {});
        setBooksByGenre(groupedBooks);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchBooks();
  }, []);

  const handleBookClick = (book) => {
    navigate("/book-details", { state: { book } });
  };

  const filteredBooks = Object.keys(booksByGenre).reduce((acc, genre) => {
    const filtered = booksByGenre[genre].filter(
      (book) =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase())
    );
    if (filtered.length) acc[genre] = filtered;
    return acc;
  }, {});

  const styles = {
    container: {
      padding: "20px",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh",
      backgroundColor: "#f9f3e3",
      fontFamily: "Arial, sans-serif",
    },
    genreSection: {
      marginBottom: "40px",
    },
    genreTitle: {
      fontSize: "24px",
      color: "#333",
      marginBottom: "10px",
    },
    booksRow: {
      display: "flex",
      flexWrap: "nowrap",
      gap: "20px",
      padding: "10px 0",
      overflowX: "auto",
      justifyContent: "flex-start",
    },
    bookCard: {
      flex: "0 0 auto",
      width: "220px",
      textAlign: "center",
    },
    bookCover: {
      width: "100%",
      height: "320px",
      objectFit: "cover",
      borderRadius: "5px",
      boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
      cursor: "pointer",
    },
    bookTitle: {
      fontSize: "16px",
      margin: "10px 0 5px",
      color: "#333",
    },
    bookAuthor: {
      fontSize: "14px",
      color: "#666",
    },
  };

  return (
    <div>
      <NavBar setSearchTerm={setSearchTerm} />
      <div style={styles.container}>
        {Object.keys(filteredBooks).map((genre) => (
          <div key={genre} style={styles.genreSection}>
            <h2 style={styles.genreTitle}>{genre}</h2>
            <div style={styles.booksRow}>
              {filteredBooks[genre].map((book, index) => (
                <div
                  key={index}
                  style={styles.bookCard}
                  onClick={() => handleBookClick(book)}
                >
                  <img
                    src={book.imageUrl}
                    alt={book.title}
                    style={styles.bookCover}
                  />
                  <h3 style={styles.bookTitle}>{book.title}</h3>
                  <p style={styles.bookAuthor}>{book.author}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default BookDisplay;
