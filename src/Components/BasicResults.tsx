// BasicResults.tsx
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

function BasicResults() {
  const location = useLocation();
  const navigate = useNavigate();
  const { answers, questions } = location.state || {}; // Retrieve answers and questions from state
  const [chatResponse, setChatResponse] = useState<string>(""); // State for ChatGPT response
  const [loading, setLoading] = useState<boolean>(true); // State to track loading

  useEffect(() => {
    if (!answers || !questions) {
      console.error("State is missing. Redirecting to BasicAssessment.");
      navigate("/basic-assessment");
      return;
    }

    async function fetchChatGPTResponse() {
      const apiKey = localStorage.getItem("MYKEY");
      if (!apiKey) {
        alert("API key is missing. Please set it on the homepage.");
        navigate("/basic-assessment");
        return;
      }

      try {
        // Format the input for ChatGPT
        const formattedInput = questions
          .map((question: string, index: number) => `${question}: ${answers[index] || "No answer provided"}`)
          .join("\n");

        console.log("Formatted Input for ChatGPT:", formattedInput); // Debugging: Log formatted input

        const response = await axios.post(
          "https://api.openai.com/v1/chat/completions",
          {
            model: "gpt-3.5-turbo",
            messages: [
              {
                role: "system",
                content: "You are a career advisor. Provide career suggestions based on the user's answers to the following questions. Please list job descriptions, salary, in an organized format. Go in depth for your reasoning based on the answers given. Put it in html format so it looks good on a website.",
              },
              {
                role: "user",
                content: `Here are the user's answers:\n${formattedInput}`,
              },
            ],
            max_tokens: 1500, // Increased max tokens for detailed output
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${JSON.parse(apiKey)}`, // Use the API key
            },
          }
        );

        console.log("ChatGPT API Response:", response.data); // Log the full API response

        const chatGPTOutput = (response.data as { choices: { message: { content: string } }[] }).choices[0]?.message?.content.trim() || "No response received.";
        console.log("ChatGPT Output:", chatGPTOutput); // Debugging: Log ChatGPT output
        setChatResponse(chatGPTOutput);
      } catch (error: any) {
        console.error("Error fetching results:", error.response || error.message);
        alert("Failed to fetch results from ChatGPT.");
      } finally {
        setLoading(false); // Stop loading
      }
    }

    fetchChatGPTResponse();
  }, [answers, questions, navigate]);

  if (!answers || !questions) {
    return <p>Redirecting...</p>; // Show a message while redirecting
  }

  if (loading) {
    return <p>Loading your career suggestions...</p>; // Show a loading message while waiting for ChatGPT response
  }

  return (
    <div className="results-page">
      <h1>Your Career Assessment Results</h1>
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
        {/* Render ChatGPT's HTML response */}
        <div dangerouslySetInnerHTML={{ __html: chatResponse }} />
      </div>
    </div>
  );
}

export default BasicResults;
