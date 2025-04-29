import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css"; // Import CSS for styling

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">Career Helper</div>
      <ul className="nav-links">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/basic-assessment">Basic Assessment</Link>
        </li>
        <li>
          <Link to="/detailed-assessment">Detailed Assessment</Link>
        </li>
        <li>
          <Link to ="/contact-page">Contact Page</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;

