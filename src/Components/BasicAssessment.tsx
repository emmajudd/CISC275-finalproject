import React from "react";
import "./BasicAssessment.css"; // Import CSS for styling
import { useNavigate } from "react-router-dom";

function BasicAssessment() {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Basic Career Assessment</h1>
      <p>Question 1: What interests you the most?</p>
      <button onClick={() => navigate("/")}>Go Back to Home</button>
    </div>
  );
}

export default BasicAssessment;

