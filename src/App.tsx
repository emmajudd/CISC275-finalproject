import React, { useState, useEffect } from "react";
import { HashRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css';

import Homepage from './Pages/Homepage'; // Import Homepage component
import BasicAssessment from './Components/BasicAssessment';
import DetailedAssessment from './Components/DetailedAssessment';
import BasicResults from './Components/BasicResults'
import Navbar from './Components/Navbar';
import ContactPage from './Components/ContactPage';



function App() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.body.className = darkMode ? "dark-mode" : "";
  }, [darkMode]);

  return (
    <div>
    <Router>
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} /> 
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/basic-assessment" element={<BasicAssessment />} />
        <Route path="/detailed-assessment" element={<DetailedAssessment />} />
        <Route path="/basic-results" element={<BasicResults />} />
        <Route path="/detailed-results" element={<BasicResults />} />
        <Route path="/contact-page" element={<ContactPage />} />
      </Routes>
    </Router>
  
    </div>

  );
}

export default App;
