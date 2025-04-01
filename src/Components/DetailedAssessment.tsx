import React, {useState} from "react";
import "./DetailedAssessment.css"; // Import CSS for styling
import { useNavigate } from "react-router-dom";
import ProgressBar from "./ProgressBar";
import { Button } from "react-bootstrap";


const questions = [
  "Is financial success more motivating to you than job stability or making a difference?",
"Would you choose an intellectually challenging job over one with better work-life balance?",
"Do you prefer working for a large company over a small startup or being self-employed?",
"Is job security more important to you than career growth and new opportunities?",
"Would you enjoy a career that requires frequent travel?",
"Is creativity essential to your ideal career?",
"Would you rather work on long-term projects than short-term tasks?",
];

function DetailedAssessment() {
  const navigate = useNavigate();
    const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  
    const handleAnswer = (index: number, answer: string) => {
      setAnswers((prev) => ({ ...prev, [index]: answer }));
    };
  
    // Calculate progress percentage
    const progress = (Object.keys(answers).length / questions.length) * 100;
  
    return (
      <div className="detailed-assessment">
        <h1>Detailed Career Assessment</h1>
  
        <ProgressBar progress={progress} />
  
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
  
          <Button type="submit" className="submit-button">
            Submit Answers
          </Button>
        </form>
  
        <Button onClick={() => navigate("/")}>Go Back to Home</Button>
      </div>
    );
  };
  
  
  export default DetailedAssessment;
  
  

