import React, { useState } from "react";
import "./BasicAssessment.css"; // Import CSS for styling the component
import { useNavigate } from "react-router-dom"; // Hook to navigate between routes
import { Button, Form } from "react-bootstrap"; // Import Bootstrap components
import ProgressBar from "./ProgressBar"; // Custom ProgressBar component
import confetti from 'canvas-confetti';


// Array of career-oriented yes/no/maybe style questions
const questions = [
  "Do you have a skill that others often struggle with but comes naturally to you?",
  "Do you prefer following instructions exactly rather than figuring things out on your own?",
  "Do you feel a sense of accomplishment when completing detailed tasks?",
  "Would you rather analyze data than manage people or build something?",
  "Are you comfortable quickly learning new technology and adapting to change?",
  "Do you enjoy public speaking more than working behind the scenes?",
  "Do you work well under pressure and strict deadlines?",
  "Is financial success more motivating to you than job stability or making a difference?",
  "Would you choose an intellectually challenging job over one with better work-life balance?",
  "Do you prefer working for a large company over a small startup or being self-employed?",
  "Is job security more important to you than career growth and new opportunities?",
  "Would you enjoy a career that requires frequent travel?",
  "Is creativity essential to your ideal career?",
  "Would you rather work on long-term projects than short-term tasks?",
];


function BasicAssessment() {
  const navigate = useNavigate(); // Hook for navigating to different routes


  // Store answers in a key-value pair where key = question index, value = selected answer
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});


  // Control the visibility of the popup that appears on successful submission
  const [showPopup, setPopup] = useState(false);


  // Updates the answer for a given question
  const handleAnswer = (index: number, answer: string) => {
    setAnswers((prev) => ({ ...prev, [index]: answer }));
  };


  // Calculate how much of the assessment has been completed (as a percentage)
  const progress = (Object.keys(answers).length / questions.length) * 100;


  return (
    <div className="basic-assessment">
      <h1>Basic Career Assessment</h1>


      {/* Show progress bar based on number of questions answered */}
      <ProgressBar progress={progress} />


      {/* Render the questions in a form with radio options */}
      <Form>
        {questions.map((question, index) => (
          <div key={index} className="question-block">
            <p>{question}</p>
            <div className="answer-options">
              {/* Radio button for "Yes" */}
              <label>
                <input
                  type="radio"
                  name={`question-${index}`}
                  value="Yes"
                  checked={answers[index] === "Yes"}
                  onChange={() => handleAnswer(index, "Yes")}
                />
                Yes
              </label>


              {/* Radio button for "No" */}
              <label>
                <input
                  type="radio"
                  name={`question-${index}`}
                  value="No"
                  checked={answers[index] === "No"}
                  onChange={() => handleAnswer(index, "No")}
                />
                No
              </label>


              {/* Radio button for "Neither" */}
              <label>
                <input
                  type="radio"
                  name={`question-${index}`}
                  value="Neither"
                  checked={answers[index] === "Neither"}
                  onChange={() => handleAnswer(index, "Neither")}
                />
                Neither
              </label>
            </div>
          </div>
        ))}
         


        {/* Submit button - validates that all questions are answered before showing popup */}
        <div className="button-container">
        <button
        
          type="submit"
          className="pinky-button"
          onClick={(e) => {
            e.preventDefault();
            if (Object.keys(answers).length === questions.length) {
              setPopup(true);
              // 🎉 Trigger confetti here
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


      {/* Popup shown after submission with navigation options */}
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h2>Thank you for your responses!</h2>
            <p>We'll use your answers to provide better career insights.</p>

            {/* Centered popup buttons */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: 15 }}>
              {/* Button to close popup and return to home */}
              <Button
                onClick={() => {
                  setPopup(false);
                  navigate("/");
                }}
                className="pinky-button"
              >
                Close and Go Home
              </Button>

              {/* Button to view the results page, passing answers and questions as state */}
              <Button
                onClick={() => {
                  setPopup(false);
                  navigate("/basic-results", { state: { questions, answers } });
                }}
                className="pinky-button"
              >
                Go to Results
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Additional navigation button to return to homepage */}
      <div className="button-container">
        <Button className="pinky-button" onClick={() => navigate("/")}>Go Back to Home</Button>
      </div>
    </div>
  );
}


export default BasicAssessment;
