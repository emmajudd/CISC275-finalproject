import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form } from "react-bootstrap";

function BasicQuestions() {
  const navigate = useNavigate(); 

  const [answers, setAnswers] = useState<string[]>([]);

  const questions = [
    "What are your interests?",
    "What are your skills?",
    "What is your preferred work environment?",
  ];

  // Handles updates to individual answers
  function handleAnswerChange(index: number, value: string) {
    // Copy the existing answers array
    const updatedAnswers = [...answers];

    // Update the answer at the specified index
    updatedAnswers[index] = value;

    // Save the new answers array to state
    setAnswers(updatedAnswers);
  }

  // Handles form submission
  function handleSubmit() {
    // Ensure all questions have been answered
    if (answers.length < questions.length || answers.some((answer) => !answer)) {
      alert("Please answer all questions before submitting.");
      return;
    }

    // If valid, navigate to results page with state containing questions and answers
    navigate("/basic-results", { state: { questions, answers } });
  }

  return (
    <div className="basic-questions">
      <h1>Basic Career Assessment</h1>

      {/* Bootstrap form for user input */}
      <Form>
        {/* Map through each question and render an input field */}
        {questions.map((question, index) => (
          <Form.Group key={index}>
            {/* Display the question */}
            <Form.Label>{question}</Form.Label>

            {/* Input field for user's answer */}
            <Form.Control
              type="text"
              value={answers[index] || ""} // Use current answer or empty string
              onChange={(e) => handleAnswerChange(index, e.target.value)} // Update on change
            />
          </Form.Group>
        ))}

        {/* Button to submit the form and trigger navigation */}
        <Button onClick={handleSubmit}>Submit</Button>
      </Form>
    </div>
  );
}

export default BasicQuestions;