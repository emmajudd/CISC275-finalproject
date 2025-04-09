// BasicResults.tsx
import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function BasicResults() {
  const navigate = useNavigate();

  return (
    <div className="results-page">
      <h1>Your Career Assessment Results</h1>
      <p>Thanks for completing the assessment! Based on your answers, here’s what we found:</p>

      {/* You can display real results here using props or shared state */}

      
    </div>
  );
}

export default BasicResults;
