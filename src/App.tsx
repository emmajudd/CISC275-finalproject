import React, { useState, useEffect } from "react"; 
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

import './App.css';

import Homepage from './Pages/Homepage'; 
import BasicAssessment from './Components/BasicAssessment';
import DetailedAssessment from './Components/DetailedAssessment';
import BasicResults from './Components/BasicResults'
import Navbar from './Components/Navbar';
import ContactPage from './Components/ContactPage';

// Custom wrapper to use location inside App
function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}
//
function App() {
  const [darkMode, setDarkMode] = useState(false);
  const location = useLocation(); // ✅ Use this instead of global `location`

  useEffect(() => {
    document.body.className = darkMode ? "dark-mode" : "";
    if (location.pathname === '/') {
      document.body.classList.add('homepage-active');
    } else {
      document.body.classList.remove('homepage-active');
    }
    if (location.pathname === '/contact-page') {
      document.body.classList.add('contact-page-active');
    } else {
      document.body.classList.remove('contact-page-active');
    }
  }, [darkMode, location.pathname]); 

  return (
    <div>
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} /> 
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/basic-assessment" element={<BasicAssessment />} />
        <Route path="/detailed-assessment" element={<DetailedAssessment />} />
        <Route path="/basic-results" element={<BasicResults />} />
        <Route path="/detailed-results" element={<BasicResults />} />
        <Route path="/contact-page" element={<ContactPage />} />
      </Routes>
    </div>
  );
}

export default AppWrapper;
