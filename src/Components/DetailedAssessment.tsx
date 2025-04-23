import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import "./DetailedAssessment.css"; // Import CSS for styling

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
  const navigate = useNavigate();
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [showPopup, setPopup] = useState(false);

  const handleAnswer = (index: number, answer: string) => {
    setAnswers((prev) => ({ ...prev, [index]: answer }));
  };

  return (
    <div className="detailed-assessment">
      <h1>Detailed Career Assessment</h1>

      <Form>
        {questions.map((question, index) => (
          <div key={index} className="question-block">
            <p>{question}</p>
            <Form.Control
              as="textarea"
              rows={3}
              value={answers[index] || ""}
              onChange={(e) => handleAnswer(index, e.target.value)}
              placeholder="Type your answer here..."
            />
          </div>
        ))}

        <Button
          type="submit"
          className="submit-button"
          onClick={(e) => {
            e.preventDefault();
            if (Object.keys(answers).length === questions.length) {
              setPopup(true);
            } else {
              alert("Please answer all questions.");
            }
          }}
        >
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
                navigate("/detailed-results", { state: { questions, answers } });
              }}
              className="mt-3"
            >
              Go to Results
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default DetailedAssessment;



