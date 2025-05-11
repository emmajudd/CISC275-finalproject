import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import "./DetailedAssessment.css"; // Import custom CSS for layout and styling
import ProgressBar from "./ProgressBar"; // Import custom ProgressBar component
import confetti from 'canvas-confetti';

// Array of career assessment questions
const questions = [
  "What are your long-term career goals?",
  "What motivates you to perform well in a job?",
  "What type of work environment do you thrive in?",
  "What are your biggest strengths and weaknesses?",
  "What is your preferred leadership style?",
  "How do you handle conflict in the workplace?",
  "What skills do you want to develop further?",
  "What industries are you most interested in?",
  "What is your ideal work-life balance?",
  "What is your preferred method of communication at work?",
];

function DetailedAssessment() {
  const navigate = useNavigate(); // Hook to navigate between pages
  const [answers, setAnswers] = useState<{ [key: number]: string }>({}); // Track answers to each question by index
  const [showPopup, setPopup] = useState(false); // Control visibility of the completion popup

  // Update the answer for a specific question when user types
  const handleAnswer = (index: number, answer: string) => {
    setAnswers((prev) => ({ ...prev, [index]: answer }));
  };

  // Count how many answers are "complete" (i.e., more than 10 characters)
  const completedAnswers = Object.values(answers).filter((ans) => ans.trim().length > 9).length;

  // Calculate progress as a percentage of completed questions
  const progress = (completedAnswers / questions.length) * 100;

  return (
    <div className="detailed-assessment">
      <h1>Detailed Career Assessment</h1>

      {/* Display the progress bar */}
      <ProgressBar progress={progress} />

      <Form>
        {/* Render each question with a corresponding text area for answers */}
        {questions.map((question, index) => (
         <div key={index} className="question-block">
           <p className="question-text">{question}</p>
           <Form.Control
             as="textarea"
             rows={3}
             maxLength={200}
             value={answers[index] || ""} // Default to empty string if no answer yet
             onChange={(e) => handleAnswer(index, e.target.value)} // Handle input changes
             placeholder="Type your answer here..."
           />
           <p className="char-min">character minimum {answers[index]?.trim().length || 0} / 10</p>
         </div>
       ))}
        {/* Submit button triggers validation and potentially shows the popup */}
        <div className="button-container">
        <button
        
          type="submit"
          className="pinky-button"
          onClick={(e) => {
            e.preventDefault();
            if (Object.keys(answers).length === questions.length) {
              setPopup(true);
              // Trigger confetti here
              confetti({
                particleCount: 350,
                spread: 70,
                origin: { y: 0.6 },
              });
            } else {
              alert("Please answer all questions");
            }
          }}
        >
          Submit Answers
        </button>
        </div>
      </Form>

      {/* Popup shown after submission is complete */}
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h2>Thank you for your responses!</h2>
            <p>We'll use your answers to provide better career insights.</p>

            {/* Button to navigate to the results page, passing data via router state */}
            <div className="button-container">
            <Button
              onClick={() => {
                setPopup(false);
                navigate("/");
              }}
              className="pinky-button"
            >
              Close and Go Home
            </Button>
            {/* Button to navigate to the results page, passing data via router state */}
            <Button
              onClick={() => {
                setPopup(false); // Hide popup
                navigate("/detailed-results", { state: { questions, answers } }); // Navigate to results page
              }}
              className="pinky-button"
            >
              Go to Results
            </Button>
          </div>
          </div>
        </div>
      )}
       <div className="button-container">
        <Button className="pinky-button" onClick={() => navigate("/")}>Go Back to Home</Button>
      </div>
    </div>
  );
}

export default DetailedAssessment;
