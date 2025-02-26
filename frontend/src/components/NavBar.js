import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function NavBar({ setSearchTerm }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-success">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/home">
            BookQuest
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to="/home">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/home/mybooks">
                  My Books
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/home/browse">
                  Browse
                </Link>
              </li>
            </ul>

            <form className="d-flex">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search books or authors"
                onChange={handleSearchChange}
              />
              <button className="btn btn-outline-light" type="submit">
                Search
              </button>
            </form>

            <button
              className="btn btn-outline-light ms-2"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
}
