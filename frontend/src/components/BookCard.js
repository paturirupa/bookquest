import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function BookCard({
  title,
  author,
  description,
  image,
  trendingInfo,
  publisher,
  genre,
  ISBNnumber,
  publishedYear,
  ratings,
  reviews
}) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const navigate = useNavigate();

  // Function to navigate to the BookDetails page
  const handleNavigation = () => {
    navigate("/book-details", {
      state: {
        book: {
          title,
          author,
          description,
          image,
          trendingInfo,
          publisher,
          genre,
          ISBNnumber,
          publishedYear,
          ratings,
          reviews,
        },
      },
    });
  };

  return (
    <div
      onClick={handleNavigation}
      style={{ cursor: "pointer" }}
      className="book-card"
    >
      <div className="card mb-3" style={{ maxWidth: "540px" }}>
        <div className="row g-0">
          <div className="col-md-4">
            <img
              src={image}
              className="img-fluid rounded-start"
              alt="Book Cover"
              style={{ height: "100%" }}
            />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title">{title}</h5>
              <p className="card-text">{description}</p>
              <button
                className="btn btn-success"
                onClick={(e) => e.stopPropagation()} // Prevents navigation when clicking this button
              >
                Want to Read
              </button>
              <div className="star-rating">
                {[...Array(5)].map((star, index) => {
                  index += 1;
                  return (
                    <button
                      type="button"
                      key={index}
                      className={index <= (hover || rating) ? "on" : "off"}
                      onClick={(e) => {
                        e.stopPropagation(); // Prevents navigation on star click
                        setRating(index);
                      }}
                      onMouseEnter={() => setHover(index)}
                      onMouseLeave={() => setHover(rating)}
                    >
                      <span className="star">&#9733;</span>
                    </button>
                  );
                })}
              </div>
              <p className="card-text mt-2">
                <small className="text-muted">{trendingInfo}</small>
              </p>
            </div>
          </div>
        </div>
      </div>

      <style>
        {`.star-rating {
          font-size: 1.5em;
          color: #ccc;
        }
        .star-rating .on {
          color: gold;
        }
        .star-rating .off {
          color: #ccc;
        }
        .star-rating button {
          background: none;
          border: none;
          cursor: pointer;
        }
        `}
      </style>
    </div>
  );
}
