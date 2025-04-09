//import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
//import logo from './logo.svg';
import './App.css';
//import { Form, Button } from 'react-bootstrap';
import Homepage from './Pages/Homepage'; // Import Homepage component
import BasicAssessment from './Components/BasicAssessment';
import DetailedAssessment from './Components/DetailedAssessment';



function App() {
  return (
    <div>
      <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/basic-assessment" element={<BasicAssessment />} />
        <Route path="/detailed-assessment" element={<DetailedAssessment />} />
      </Routes>
    </Router>
  
    </div>
    
    
    
    /*
    <div><Homepage /></div>
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
          Mia Pfaff
          Emma Judd
          Sean Smith
          Tyler Walsh
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      
     </div>
      <Form>
        <Form.Label>API Key:</Form.Label>
        <Form.Control type="password" placeholder="Insert API Key Here" onChange={changeKey}></Form.Control>
        <br></br>
        <Button className="Submit-Button" onClick={handleSubmit}>Submit</Button>
      </Form>
      */
  /* Render Homepage component */
      
  );
}

export default App;
