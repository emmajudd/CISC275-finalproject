import React, { useState } from "react";
import "./BasicAssessment.css"; // Import CSS for styling
import { useNavigate } from "react-router-dom";
import { Form } from "react-bootstrap";

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

  const handleAnswer = (index: number, answer: string) => {
    setAnswers((prev) => ({ ...prev, [index]: answer }));
  };

  return (
    <div className="basic-assessment">
      <h1>Basic Career Assessment</h1>

      <form>
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

        <button type="submit" className="submit-button">
          Submit Answers
        </button>
      </form>

      <button onClick={() => navigate("/")}>Go Back to Home</button>
    </div>
  );
};


export default BasicAssessment;

