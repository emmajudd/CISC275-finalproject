import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";


//interface that handles the darmode state for the navigation bar
interface NavbarProps {
darkMode: boolean;
setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}
//naviagation bar container
const Navbar: React.FC<NavbarProps> = ({ darkMode, setDarkMode }) => {
return (
  <nav className="navbar">
   {/*links to use in the navigation bar*/}
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
    {/*dark and light mode button when the user clicks it toggles between the mode originally set to light mode*/}
    <button className="pinky-button"
      onClick={() => setDarkMode((prev) => !prev)}
    
    >
      {darkMode ? "Light Mode" : "Dark Mode"}
    </button>
  </nav>
);
};




export default Navbar;
