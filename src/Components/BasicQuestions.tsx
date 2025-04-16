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
  ]; // Define the questions here

  function handleAnswerChange(index: number, value: string) {
    const updatedAnswers = [...answers];
    updatedAnswers[index] = value;
    setAnswers(updatedAnswers);
  }

  function handleSubmit() {
    if (answers.length < questions.length || answers.some((answer) => !answer)) {
      alert("Please answer all questions before submitting.");
      return;
    }

    // Navigate to BasicResults with the questions and answers in the state
    navigate("/basic-results", { state: { questions, answers } });
  }

  return (
    <div className="basic-questions">
      <h1>Basic Career Assessment</h1>
      <Form>
        {questions.map((question, index) => (
          <Form.Group key={index}>
            <Form.Label>{question}</Form.Label>
            <Form.Control
              type="text"
              value={answers[index] || ""}
              onChange={(e) => handleAnswerChange(index, e.target.value)}
            />
          </Form.Group>
        ))}
        <Button onClick={handleSubmit}>Submit</Button>
      </Form>
    </div>
  );
}

export default BasicQuestions;
