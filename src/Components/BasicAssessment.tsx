import React, { useState } from "react";
import "./BasicAssessment.css"; 
import { useNavigate } from "react-router-dom"; 
import { Button, Form } from "react-bootstrap"; 
import ProgressBar from "./ProgressBar";
import confetti from 'canvas-confetti';

// this is a list of questions for the user to anwswer via the radio buttons below
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
  const navigate = useNavigate();  // for page transitions

  const [answers, setAnswers] = useState<{ [key: number]: string }>({});

  const [showPopup, setPopup] = useState(false);

  const handleAnswer = (index: number, answer: string) => {
    setAnswers((prev) => ({ ...prev, [index]: answer }));
  };

  const progress = (Object.keys(answers).length / questions.length) * 100;

  return (
    <div className="basic-assessment">
      <h1>Basic Career Assessment</h1>

      <ProgressBar progress={progress} />


      {/* radio options */}
      <Form>
        {questions.map((question, index) => (
          <div key={index} className="question-block">
            <p>{question}</p>
            <div className="answer-options">
              {/* Yes */}
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


              {/* No */}
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


              {/* Neither */}
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
         


        {/* Submit button*/}
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


      {/* Popup shown after submission */}
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h2>Thank you for your responses!</h2>
            <p>We'll use your answers to provide better career insights.</p>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: 15 }}>
              {/* Close popup and return to home */}
              <Button
                onClick={() => {
                  setPopup(false);
                  navigate("/");
                }}
                className="pinky-button"
              >
                Close and Go Home
              </Button>

              {/* Button to view the results page*/}
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

      {/* Return to homepage but without submission*/}
      <div className="button-container">
        <Button className="pinky-button" onClick={() => navigate("/")}>Go Back to Home</Button>
      </div>
    </div>
  );
}


export default BasicAssessment;
