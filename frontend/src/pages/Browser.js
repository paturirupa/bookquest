import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Use useNavigate instead of useHistory
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

const books = {
  History: [
    {
      title: "Prisoner of Lies",
      author: "Barry Werth",
      cover:
        "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1702658110i/199797558.jpg",
      description:
        "Explore the harrowing tale of America’s longest-held POW, Jack Downey, whose espionage activities during the Cold War led to decades of captivity. A gripping story of survival, resilience, and the complex moralities of international politics.",
    },
    {
      title: "Shameless",
      author: "Brian Tyler Cohen",
      cover:
        "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1716908035i/204901666.jpg",
      description:
        "A hard-hitting analysis of the political dysfunction that plagues modern democracy. Cohen unpacks the deliberate decisions and actions that undermine the very foundation of the democratic process in America.",
    },
    {
      title: "The Devil Behind the Badge",
      author: "Rick Jervis",
      cover:
        "https://images-na.ssl-images-amazon.com/images/I/91JY-SXNjlL._AC_UL210_SR210,210_.jpg",
      description:
        "An investigative look into the hidden world of corruption within law enforcement. Jervis reveals the shocking truths behind the badge and the impact on justice and community trust.",
    },
    {
      title: "The Dragon from Chicago",
      author: "Pamela D. Toler",
      cover: "https://www.beacon.org/Assets/ProductImages/978-080703515-3.jpg",
      description:
        "The untold story of a formidable figure who rose from the streets of Chicago to international prominence. Toler’s biography uncovers the challenges and triumphs that defined this remarkable journey.",
    },
    {
      title: "Paradise Bronx",
      author: "Ian Frazier",
      cover: "https://mpd-biblio-covers.imgix.net/9780374280567.jpg",
      description:
        "A vivid portrayal of the vibrant culture, history, and enduring spirit of the Bronx. Frazier captures the essence of a community that thrives amidst adversity and change.",
    },
  ],
   
 Science: [
    {
      title: "Betrüger",
      author: "Lydia Benecke",
      cover: "https://m.media-amazon.com/images/I/41MGCOuzHBL._SY580_.jpg",
      description:
        "Dive into the psychological world of manipulation and deceit with forensic psychologist Lydia Benecke. This book dissects the minds of con artists and explores how deception influences human behavior and relationships.",
    },
    {
      title: "Love Triangle",
      author: "Matt Parker",
      cover:
        "https://m.media-amazon.com/images/I/71+ERlM42hL._AC_UF1000,1000_QL80_.jpg",
      description:
        "Matt Parker takes readers on a mathematical journey through the shapes and patterns that define our world. Discover how trigonometry is not just about angles and lines, but a way to understand the universe.",
    },
    {
      title: "Living on Earth",
      author: "Peter Godfrey-Smith",
      cover:
        "https://m.media-amazon.com/images/I/71+ERlM42hL._AC_UF1000,1000_QL80_.jpg",
      description:
        "A philosophical and scientific exploration of the natural world, focusing on the consciousness and interactions of living beings. Godfrey-Smith provides a profound look at life from the perspective of various species.",
    },
    {
      title: "I Heard There Was a Secret Chord",
      author: "Daniel J. Levitin",
      cover:
        "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1715195566l/205478768.jpg",
      description:
        "A fascinating intersection of music and neuroscience. Levitin explores how music affects our brains and bodies, drawing connections between melody, memory, and emotion.",
    },
    {
      title: "Volcanoes",
      author: "Unknown",
      cover:
        "https://rukminim2.flixcart.com/image/850/1000/k4ehnrk0/book/1/5/4/volcanoes-original-imafnbgcehdgcrwe.jpeg?q=90&crop=false",
      description:
        "An explosive guide to the world’s most dynamic geological phenomena. This book provides an in-depth look at how volcanoes are formed, their impact on the environment, and the science behind their powerful eruptions.",
    },
  ],
  Fiction: [
    {
      title: "The Midnight Library",
      author: "Matt Haig",
      cover: "https://m.media-amazon.com/images/I/41XSxPwoL3L._SY780_.jpg",
      description:
        "Nora Seed finds herself in a library between life and death, where every book offers a glimpse into another life she could have lived. A heartfelt journey through regret, choices, and the infinite possibilities of human existence.",
    },
    {
      title: "Where the Crawdads Sing",
      author: "Delia Owens",
      cover:
        "https://upload.wikimedia.org/wikipedia/en/2/23/Where_the_Crawdads_Sing_%28film%29.jpg",
      description:
        'In the marshlands of North Carolina, Kya Clark, the "Marsh Girl," grows up in isolation. As she learns about the world through her own eyes, she becomes entangled in a murder mystery that reveals the dark secrets of the local community.',
    },
    {
      title: "The Vanishing Half",
      author: "Brit Bennett",
      cover:
        "https://m.media-amazon.com/images/I/71AhaMqMsxL._AC_UF1000,1000_QL80_.jpg",
      description:
        "A powerful exploration of identity, family, and race. The Vignes twin sisters lead divergent lives — one passing for white, the other living as black. Their paths intersect in unexpected ways, challenging their perceptions of self and society.",
    },
    {
      title: "Normal People",
      author: "Sally Rooney",
      cover:
        "https://m.media-amazon.com/images/I/71fnqwR0eSL._AC_UF1000,1000_QL80_.jpg",
      description:
        "Connell and Marianne’s complicated relationship unfolds against the backdrop of their small Irish town and university life in Dublin. Rooney delves into the intricacies of young love, class divides, and the search for personal identity.",
    },
    {
      title: "The Invisible Life of Addie LaRue",
      author: "V.E. Schwab",
      cover: "https://m.media-amazon.com/images/I/41OdAgjWYzL._SY780_.jpg",
      description:
        "Addie LaRue makes a Faustian bargain to live forever, but is cursed to be forgotten by everyone she meets. Centuries later, she meets a man who remembers her name. Schwab weaves a tale of love, loss, and the indomitable spirit of a woman who refuses to fade away.",
    },
  ],
  Mystery: [
    {
      title: "The Guest List",
      author: "Lucy Foley",
      cover:
        "https://m.media-amazon.com/images/I/81sh+BJhaOS._AC_UF1000,1000_QL80_.jpg",
      description:
        "A glamorous wedding on a remote Irish island turns deadly when one guest is found dead. Foley masterfully unravels the secrets and lies that each guest harbors, leading to a shocking climax where anyone could be the killer.",
    },
    {
      title: "The Silent Patient",
      author: "Alex Michaelides",
      cover:
        "https://m.media-amazon.com/images/I/81JJPDNlxSL._AC_UF1000,1000_QL80_.jpg",
      description:
        "Alicia Berenson’s life seems perfect until she shoots her husband and stops speaking. Theo Faber, a criminal psychotherapist, is determined to unravel the mystery behind her silence, but discovers more than he bargained for.",
    },
    {
      title: "The Maidens",
      author: "Alex Michaelides",
      cover:
        "https://m.media-amazon.com/images/I/81K05pTbJUL._AC_UF1000,1000_QL80_.jpg",
      description:
        "When a series of murders rocks Cambridge University, Mariana, a brilliant but troubled therapist, becomes obsessed with uncovering the truth. Her investigation leads her into the dark, secretive world of an exclusive society known as The Maidens.",
    },
    {
      title: "Big Little Lies",
      author: "Liane Moriarty",
      cover:
        "https://m.media-amazon.com/images/I/81N+sjNpGML._AC_UF1000,1000_QL80_.jpg",
      description:
        "Set in a picturesque seaside town, this novel explores the lives of three women entangled in a web of secrets, lies, and one deadly incident. Moriarty masterfully blends suspense, humor, and social commentary in a story of friendship and betrayal.",
    },
    {
      title: "The Girl with the Dragon Tattoo",
      author: "Stieg Larsson",
      cover:
        "https://rukminim2.flixcart.com/image/850/1000/kklhbbk0/book/w/w/p/the-girl-with-the-dragon-tattoo-original-imafzwrpg6snapkx.jpeg?q=90&crop=false",
      description:
        "A disgraced journalist and a brilliant but troubled hacker team up to solve a decades-old disappearance in one of Sweden’s wealthiest families. Larsson’s gripping thriller exposes the dark underbelly of corporate corruption and personal vendettas.",
    },
  ],
  Fantasy: [
    {
      title: "A Game of Thrones",
      author: "George R.R. Martin",
      cover:
        "https://m.media-amazon.com/images/I/714ExofeKJL._AC_UF1000,1000_QL80_.jpg",
      description:
        "In the land of Westeros, noble families vie for control of the Iron Throne. Martin’s epic saga of betrayal, power, and intrigue is filled with richly drawn characters and a complex web of alliances and rivalries.",
    },
    {
      title: "The Name of the Wind",
      author: "Patrick Rothfuss",
      cover:
        "https://m.media-amazon.com/images/I/611iKJa7a-L._AC_UF1000,1000_QL80_.jpg",
      description:
        "Kvothe, a legendary figure in his own time, recounts the story of his life — from humble beginnings to the heights of magic and power. Rothfuss crafts a world brimming with danger, music, and magic in this compelling fantasy narrative.",
    },
    {
      title: "The Way of Kings",
      author: "Brandon Sanderson",
      cover:
        "https://m.media-amazon.com/images/I/91UDzcPH-nL._AC_UF1000,1000_QL80_.jpg",
      description:
        "On the Shattered Plains, Kaladin, Dalinar, and Shallan struggle against a mysterious enemy known as the Parshendi. Sanderson weaves a complex tapestry of characters and epic battles in a world where storms shape the land and destiny.",
    },
    {
      title: "Mistborn",
      author: "Brandon Sanderson",
      cover:
        "https://m.media-amazon.com/images/I/91MtImlhRSL._AC_UF1000,1000_QL80_.jpg",
      description:
        "In a world where ash falls from the sky and mist dominates the night, a young street urchin named Vin discovers her latent abilities as a Mistborn. Together with a band of rebels, she takes on the oppressive Lord Ruler to change the fate of her world.",
    },
    {
      title: "Harry Potter and the Sorcerer’s Stone",
      author: "J.K. Rowling",
      cover:
        "https://m.media-amazon.com/images/I/71-wdsbErJL._AC_UF1000,1000_QL80_.jpg",
      description:
        "Harry Potter, a young boy living with his cruel aunt and uncle, discovers he is a wizard on his eleventh birthday. As he embarks on his magical education at Hogwarts, he uncovers the truth about his parents’ deaths and his own destiny.",
    },
  ],
};

const BookDisplay = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate(); // Use navigate hook

  const handleBookClick = (book) => {
    navigate("/book-details", { state: { book } }); // Use navigate to route to BookDetails page
  };

  const filteredBooks = Object.keys(books).reduce((acc, genre) => {
    const filtered = books[genre].filter(
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
      overflowX: "auto",
      gap: "10px",
      padding: "10px 0",
    },
    bookCard: {
      flex: "0 0 auto",
      width: "150px",
      textAlign: "center",
    },
    bookCover: {
      width: "100%",
      height: "225px",
      objectFit: "cover",
      borderRadius: "5px",
      boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
      cursor: "pointer", // Change cursor to pointer
    },
    bookTitle: {
      fontSize: "14px",
      margin: "10px 0 5px",
      color: "#333",
    },
    bookAuthor: {
      fontSize: "12px",
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
              {filteredBooks[genre].map((book, index) => {
                return (
                  <div
                    key={index}
                    style={styles.bookCard}
                    onClick={() => handleBookClick(book)} // Click to navigate
                  >
                    <img
                      src={book.cover}
                      alt={book.title}
                      style={styles.bookCover}
                    />
                    <h3 style={styles.bookTitle}>{book.title}</h3>
                    <p style={styles.bookAuthor}>{book.author}</p>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default BookDisplay;
