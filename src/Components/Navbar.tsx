import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css"; 


interface NavbarProps {
 darkMode: boolean;
 setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}

const Navbar: React.FC<NavbarProps> = ({ darkMode, setDarkMode }) => {
 return (
   <nav className="navbar">
    
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
     <button className="pinky-button"
       onClick={() => setDarkMode((prev) => !prev)}
      
     >
       {darkMode ? "Light Mode" : "Dark Mode"}
     </button>
   </nav>
 );
};


export default Navbar;

