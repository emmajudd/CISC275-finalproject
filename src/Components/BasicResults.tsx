// BasicResults.tsx
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

function BasicResults() {
  const location = useLocation();
  const navigate = useNavigate();
  const { answers, questions } = location.state || {}; // Retrieve answers and questions from state

  if (!answers || !questions) {
    console.error("State is missing. Redirecting to BasicAssessment.");
    navigate("/basic-assessment");
    return <p>Redirecting...</p>; // Show a message while redirecting
  }

  return (
    <div className="results-page">
      <h1>Your Career Assessment Results</h1>
      <p>Thanks for completing the assessment! Here are your answers:</p>
      <div className="user-answers">
        <ul>
          {questions.map((question: string, index: number) => (
            <li key={index}>
              <strong>{question}</strong>: {answers[index] || "No answer provided"}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default BasicResults;
