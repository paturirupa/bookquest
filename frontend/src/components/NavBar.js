// import React from "react";
// import { Link, useNavigate } from "react-router-dom";

// export default function NavBar({ setSearchTerm }) {
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     navigate("/");
//   };

//   const handleSearchChange = (e) => {
//     setSearchTerm(e.target.value);
//   };

//   return (
//     <div>
//       <nav className="navbar navbar-expand-lg navbar-light bg-success">
//         <div className="container-fluid">
//           <Link className="navbar-brand" to="/home">
//             BookQuest
//           </Link>
//           <button
//             className="navbar-toggler"
//             type="button"
//             data-bs-toggle="collapse"
//             data-bs-target="#navbarSupportedContent"
//             aria-controls="navbarSupportedContent"
//             aria-expanded="false"
//             aria-label="Toggle navigation"
//           >
//             <span className="navbar-toggler-icon"></span>
//           </button>
//           <div className="collapse navbar-collapse" id="navbarSupportedContent">
//             <ul className="navbar-nav me-auto mb-2 mb-lg-0">
//               <li className="nav-item">
//                 <Link className="nav-link" to="/home">
//                   Home
//                 </Link>
//               </li>
//               <li className="nav-item">
//                 <Link className="nav-link" to="/home/mybooks">
//                   My Books
//                 </Link>
//               </li>
//               <li className="nav-item">
//                 <Link className="nav-link" to="/home/browse">
//                   Browse
//                 </Link>
//               </li>
//             </ul>

//             <form className="d-flex">
//               <input
//                 className="form-control me-2"
//                 type="search"
//                 placeholder="Search books or authors"
//                 onChange={handleSearchChange}
//               />
//               <button className="btn btn-outline-light" type="submit">
//                 Search
//               </button>
//             </form>

//             <button
//               className="btn btn-outline-light ms-2"
//               onClick={handleLogout}
//             >
//               Logout
//             </button>
//           </div>
//         </div>
//       </nav>
//     </div>
//   );
// }


import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa"; // Import user icon

export default function NavBar({ setSearchTerm }) {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const user = { username: "JohnDoe", email: "johndoe@example.com" }; // Replace this with actual user data

  const handleLogout = () => {
    navigate("/");
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-success">
      <div className="container-fluid">
        {/* Left: Brand Name */}
        <Link className="navbar-brand text-white fw-bold" to="/home">
          BookQuest
        </Link>

        {/* Toggle Button for Small Screens */}
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

        {/* Center: Navigation Links */}
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link text-white" to="/home">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/home/mybooks">
                My Books
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/home/browse">
                Browse
              </Link>
            </li>
          </ul>

          {/* Search Bar */}
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

          {/* Profile Dropdown */}
          <div className="dropdown ms-3">
            <button
              className="btn btn-outline-light dropdown-toggle"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              <FaUser size={20} /> Profile
            </button>

            {showDropdown && (
              <div
                className="dropdown-menu show p-3"
                style={{
                  position: "absolute",
                  right: "0px",
                  backgroundColor: "white",
                  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                  borderRadius: "5px",
                  minWidth: "220px",
                  zIndex: 1000,
                }}
              >
                {user ? (
                  <>
                    <p className="mb-2"><strong>Username:</strong> {user.username}</p>
                    <p className="mb-2"><strong>Email:</strong> {user.email}</p>
                    <hr />
                    <button className="btn btn-danger w-100" onClick={handleLogout}>
                      Logout
                    </button>
                  </>
                ) : (
                  <button
                    className="btn btn-primary w-100"
                    onClick={() => navigate("/login")}
                  >
                    Login
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

