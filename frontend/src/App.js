import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Home from "./pages/Home";
import Login from "./pages/Login";
import HomePage from "./pages/HomePage.js";
import Register from "./pages/Register.js";
import Browser from "./pages/Browser.js";
import BookDetails from "./pages/BookDetails.js";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/home/browse" element={<Browser />} />
          <Route path="/book-details" element={<BookDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
