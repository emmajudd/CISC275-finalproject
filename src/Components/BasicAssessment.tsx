import React, { useState } from "react";
import "./BasicAssessment.css"; // Import CSS for styling
import { useNavigate } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import ProgressBar from "./ProgressBar";

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
  const navigate = useNavigate();
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [showPopup, setPopup] = useState(false);

  const handleAnswer = (index: number, answer: string) => {
    setAnswers((prev) => ({ ...prev, [index]: answer }));
  };

  // Calculate progress percentage
  const progress = (Object.keys(answers).length / questions.length) * 100;

  const handlePopup = ()=>{setPopup(true)};

  return (
    <div className="basic-assessment">
      <h1>Basic Career Assessment</h1>
      
      <ProgressBar progress={progress} />

      <Form>
        {questions.map((question, index) => (
          <div key={index} className="question-block">
            <p>{question}</p>
            <div className="answer-options">
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

        <Button 
        type="submit" className="submit-button" onClick={() => handlePopup()}>
          
          Submit Answers
        </Button>
      </Form>
      {showPopup && (
  <div className="popup-overlay">
    <div className="popup-content">
      <h2>Thank you for your responses!</h2>
      <p>We'll use your answers to provide better career insights.</p>

      <Button
        onClick={() => {
          setPopup(false);
          navigate("/");
        }}
        className="mt-3"
      >
        Close and Go Home
      </Button>

      <Button
        onClick={() => {setPopup(false)
          navigate("/basic-results")}
        }
        className="mt-3 ms-2"
      >
        Go to Results
      </Button>
      
    </div>
  </div>
)}

      <Button onClick={() => navigate("/")}>Go Back to Home</Button>
    </div>
  );
};


export default BasicAssessment;

