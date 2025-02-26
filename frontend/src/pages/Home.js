import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import BookCard from "../components/BookCard";
import "../css/carousel.css";
import img from "../images/image.png";

export default function Home() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [bookCards, setBookCards] = useState([]);
  const [loading, setLoading] = useState(true);

  const carouselBooks = [
    { id: 1, title: "The Silent Patient", image: img },
    {
      id: 2,
      title: "The Midnight Library",
      image:
        "https://th.bing.com/th/id/OIP.nfV2RzpHHA5Z1Nb90k4tVwHaE7?rs=1&pid=ImgDetMain",
    },
    {
      id: 3,
      title: "The Vanishing Half",
      image:
        "https://www.momdoesreviews.com/wp-content/uploads/2017/06/Reading-quote.jpg",
    },
    {
      id: 4,
      title: "Anxious People",
      image:
        "https://wallpapers.com/images/hd/immerse-in-the-world-of-literature-a-quote-on-books-9xeipdhtpxsqo1ii.jpg",
    },
  ];

  useEffect(() => {
    fetch("http://localhost:5000/api/books")
      .then((response) => response.json())
      .then((data) => {
        setBookCards(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching books:", error);
        setLoading(false);
      });
  }, []);

  const [activeIndex, setActiveIndex] = useState(2);

  const prevSlide = () => {
    setActiveIndex(activeIndex === 0 ? carouselBooks.length - 1 : activeIndex - 1);
  };

  const nextSlide = () => {
    setActiveIndex(activeIndex === carouselBooks.length - 1 ? 0 : activeIndex + 1);
  };

  const handleReadClick = (book) => {
    navigate("/book-details", { state: { book } });
  };

  const filteredBooks = bookCards.filter(
    (book) =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ backgroundColor: "#FFFDD0", minHeight: "100vh" }}>
      <NavBar setSearchTerm={setSearchTerm} />
      <div className="carousel-container">
        <div className="carousel-wrapper">
          {carouselBooks.map((book, index) => (
            <div
              key={book.id}
              className={`carousel-item ${index === activeIndex ? "active" : ""}`}
              style={{
                transform: `translateX(${(index - activeIndex) * 100}%)`,
              }}
            >
              <img src={book.image} alt={book.title} className="carousel-img" />
            </div>
          ))}
        </div>
        <button className="carousel-control-prev" onClick={prevSlide}>
          &#8249;
        </button>
        <button className="carousel-control-next" onClick={nextSlide}>
          &#8250;
        </button>
      </div>
      <div className="book-cards-container">
        {loading ? (
          <p>Loading books...</p>
        ) : (
          <div className="book-card-grid">
            {filteredBooks.map((book) => (
              <BookCard
                key={book.id}
                title={book.title}
                author={book.author}
                description={book.description}
                image={book.imageUrl}
                trendingInfo={book.trendingInfo}
                publisher={book.publisher}
                genre={book.genre}
                ISBNnumber={book.ISBNnumber}
                publishedYear={book.publishedYear}
                rating={book.ratings}
                reviews={book.reviews}
                onClick={() => handleReadClick(book)}
              />
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
