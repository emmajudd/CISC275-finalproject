//import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
//import logo from './logo.svg';
import './App.css';
//import { Form, Button } from 'react-bootstrap';
import Homepage from './Pages/Homepage'; // Import Homepage component
import BasicAssessment from './Components/BasicAssessment';
import DetailedAssessment from './Components/DetailedAssessment';
import Navbar from './Components/Navbar';



function App() {
  return (
    <div>
    <Router>
      <Navbar /> 
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/basic-assessment" element={<BasicAssessment />} />
        <Route path="/detailed-assessment" element={<DetailedAssessment />} />
      </Routes>
    </Router>
  
    </div>

  );
}

export default App;
