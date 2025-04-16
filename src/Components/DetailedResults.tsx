// DetailedResults.tsx
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

function DetailedResults() {
  const location = useLocation();
  const navigate = useNavigate();
  const { answers, questions } = location.state || {};
  const [chatResponse, setChatResponse] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!answers || !questions) {
      console.error("State is missing. Redirecting to DetailedAssessment.");
      navigate("/detailed-assessment");
      return;
    }

    async function fetchChatGPTResponse() {
      const apiKey = localStorage.getItem("MYKEY");
      if (!apiKey) {
        alert("API key is missing. Please set it on the homepage.");
        navigate("/detailed-assessment");
        return;
      }

      try {
        const formattedInput = questions
          .map((question: string, index: number) => `${question}: ${answers[index] || "No answer provided"}`)
          .join("\n");

        const response = await axios.post(
          "https://api.openai.com/v1/chat/completions",
          {
            model: "gpt-3.5-turbo",
            messages: [
              {
                role: "system",
                content: "You are a career advisor. Provide detailed career suggestions based on the user's answers. Include job descriptions, salary ranges, and reasoning in HTML format.",
              },
              {
                role: "user",
                content: `Here are the user's answers:\n${formattedInput}`,
              },
            ],
            max_tokens: 1500,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${JSON.parse(apiKey)}`,
            },
          }
        );

        const chatGPTOutput = (response.data as { choices: { message: { content: string } }[] }).choices[0]?.message?.content.trim() || "No response received.";
        setChatResponse(chatGPTOutput);
      } catch (error: any) {
        console.error("Error fetching results:", error.response || error.message);
        alert("Failed to fetch results from ChatGPT.");
      } finally {
        setLoading(false);
      }
    }

    fetchChatGPTResponse();
  }, [answers, questions, navigate]);

  if (!answers || !questions) {
    return <p>Redirecting...</p>;
  }

  if (loading) {
    return <p>Loading your career suggestions...</p>;
  }

  return (
    <div className="results-page">
      <h1>Your Detailed Career Assessment Results</h1>
      <p>Thanks for completing the assessment! Here are your answers:</p>
      <div className="user-answers">
        <ul>
          {questions.map((question: string, index: number) => (
            <li key={index}>
              <strong>{question}</strong>: {answers[index] || "No answer provided"}
            </li>
          ))}
        </ul>
      </div>
      <div className="chat-response">
        <h3>Career Suggestions:</h3>
        <div dangerouslySetInnerHTML={{ __html: chatResponse }} />
      </div>
    </div>
  );
}

export default DetailedResults;
