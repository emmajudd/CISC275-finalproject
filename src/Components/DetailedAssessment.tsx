import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import "./DetailedAssessment.css"; 
import ProgressBar from "./ProgressBar"; 
import confetti from 'canvas-confetti';

// this is a list of questions for the user to anwswer via input boxes below
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
  const navigate = useNavigate(); // for page transitions
  const [answers, setAnswers] = useState<{ [key: number]: string }>({}); 
  const [showPopup, setPopup] = useState(false); 

  const handleAnswer = (index: number, answer: string) => {
    setAnswers((prev) => ({ ...prev, [index]: answer }));
  };

  const completedAnswers = Object.values(answers).filter((ans) => ans.trim().length > 9).length;

  const progress = (completedAnswers / questions.length) * 100;

  return (
    <div className="detailed-assessment">
      <h1>Detailed Career Assessment</h1>

      <ProgressBar progress={progress} />

      <Form>
        {/* Shows each question with a input area for answers */}
        {questions.map((question, index) => (
         <div key={index} className="question-block">
           <p className="question-text">{question}</p>
           <Form.Control
             as="textarea"
             rows={3}
             maxLength={200}
             value={answers[index] || ""} // if no answer, empty string placeholder
             onChange={(e) => handleAnswer(index, e.target.value)} 
             placeholder="Type your answer here..."
           />
           <p className="char-min">character minimum {answers[index]?.trim().length || 0} / 10</p>
         </div>
       ))}
    
        <div className="button-container">
        <button
        
          type="submit"
          className="pinky-button"
          onClick={(e) => {
            e.preventDefault();
            if (Object.keys(answers).length === questions.length) {
              setPopup(true);
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

      {/* Popup displays after submission */}
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h2>Thank you for your responses!</h2>
            <p>We'll use your answers to provide better career insights.</p>

            {/* Button to navigate to the results page */}
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
      
            <Button
              onClick={() => {
                setPopup(false); // Hides popup
                navigate("/detailed-results", { state: { questions, answers } }); 
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
