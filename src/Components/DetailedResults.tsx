// Portions of this component were generated with the assistance of ChatGPT
// Functionality includes handling route state, input validation and redirection,
// API communication with ChatGPT, and response state management

import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import loading from '../Assets/loading.gif'; 

function DetailedResults() {
  const location = useLocation();
  const navigate = useNavigate();

  // Destructure answers and questions from router state
  const { answers, questions } = location.state || {};

  // State to hold the ChatGPT response and loading status
  const [chatResponse, setChatResponse] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Redirect to assessment page if state is missing
    if (!answers || !questions) {
      console.error("State is missing. Redirecting to DetailedAssessment.");
      navigate("/detailed-assessment");
      return;
    }

    // Function to call OpenAI's API with user's answers and questions
    async function fetchChatGPTResponse() {
      const apiKey = localStorage.getItem("MYKEY");

      // Ensure API key exists before proceeding
      if (!apiKey) {
        alert("API key is missing. Please set it on the homepage.");
        navigate("/detailed-assessment");
        return;
      }

      try {
        // Format questions and answers into a single string
        const formattedInput = questions
          .map(
            (question: string, index: number) =>
              `${question}: ${answers[index] || "No answer provided"}`
          )
          .join("\n");

        // Send formatted input to OpenAI API
        const response = await axios.post(
          "https://api.openai.com/v1/chat/completions",
          {
            model: "gpt-4o",
            messages: [
              {
                role: "system",
                content: `You are a career advisor. Provide detailed career suggestions based on the user's answers.`,
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

        // Extract and clean ChatGPT output
        const chatGPTOutput =
          (
            response.data as {
              choices: { message: { content: string } }[];
            }
          ).choices[0]?.message?.content.trim() || "No response received.";

        console.log("ChatGPT Output:", chatGPTOutput); 

        // Remove html ticks in results
        const cleanedOutput = chatGPTOutput
          .replace(/^```(?:html)?/i, "")
          .replace(/```$/, "")
          .trim();

        // Store the cleaned output
        setChatResponse(cleanedOutput); 
      } catch (error: any) {
        // Handle errors 
        console.error("Error fetching results:", error.response || error.message);
        alert("Failed to fetch results from ChatGPT.");
      } finally {
        // Stop loading indicator
        setIsLoading(false);
      }
    }

    fetchChatGPTResponse();
  }, [answers, questions, navigate]);

  // Display redirect message if user is being redirected
  if (!answers || !questions) {
    return <p>Redirecting...</p>;
  }

  // Show loading spinner while waiting for ChatGPT response
  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <img
          src={loading}
          alt="Loading..."
          className="loading-gif"
          style={{ width: "100px", height: "100px" }}
        />
      </div>
    );
  }

  // Display user input and ChatGPT generated career suggestions
  return (
    <div className="results-container">
      <h1>Your Detailed Career Assessment Results</h1>
      <p>Thanks for completing the detailed assessment! Here are your answers:</p>

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
        {/* Render ChatGPT response as raw HTML */}
        <div dangerouslySetInnerHTML={{ __html: chatResponse }} />
      </div>
    </div>
  );
}

export default DetailedResults;
