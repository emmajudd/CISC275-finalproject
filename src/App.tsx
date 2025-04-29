//import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
//import logo from './logo.svg';
import './App.css';
//import { Form, Button } from 'react-bootstrap';
import Homepage from './Pages/Homepage'; // Import Homepage component
import BasicAssessment from './Components/BasicAssessment';
import DetailedAssessment from './Components/DetailedAssessment';
import BasicResults from './Components/BasicResults'
import Navbar from './Components/Navbar';
import ContactPage from './Components/ContactPage';



function App() {
  return (
    <div>
    <Router>
      <Navbar /> 
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
