import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

function DetailedResults() {
  const location = useLocation(); // Access navigation state passed from previous page
  const navigate = useNavigate(); // Navigation hook for redirects

  // Destructure answers and questions from router state (sent from DetailedAssessment)
  const { answers, questions } = location.state || {};

  // State to store ChatGPT response
  const [chatResponse, setChatResponse] = useState<string>("");

  // Loading indicator while waiting for response
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Redirect to assessment page if state is missing (when user refreshes or lands directly)
    if (!answers || !questions) {
      console.error("State is missing. Redirecting to DetailedAssessment.");
      navigate("/detailed-assessment");
      return;
    }

    // Fetch GPT-generated career advice based on user's answers
    async function fetchChatGPTResponse() {
      const apiKey = localStorage.getItem("MYKEY"); // Retrieve stored OpenAI API key

      // If no key, show alert and redirect
      if (!apiKey) {
        alert("API key is missing. Please set it on the homepage.");
        navigate("/detailed-assessment");
        return;
      }

      try {
        // Combine questions and corresponding answers into a formatted string
        const formattedInput = questions
          .map((question: string, index: number) => `${question}: ${answers[index] || "No answer provided"}`)
          .join("\n");

        // Send request to OpenAI's chat API
        const response = await axios.post(
          "https://api.openai.com/v1/chat/completions",
          {
            model: "gpt-3.5-turbo", // Specify model
            messages: [
              {
                role: "system",
                content: "You are a career advisor. Provide detailed career suggestions based on the user's answers. Include job descriptions, salary ranges, and reasoning in HTML format.",
              },
              {
                role: "user",
                content: `Here are the user's answers:\n${formattedInput}`, // Send formatted answers as user message
              },
            ],
            max_tokens: 1500, // Limit response length
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${JSON.parse(apiKey)}`, // Attach API key
            },
          }
        );

        // Extract the returned content from ChatGPT's response
        const chatGPTOutput = (response.data as { choices: { message: { content: string } }[] }).choices[0]?.message?.content.trim() || "No response received.";
        setChatResponse(chatGPTOutput); // Store the output in state
      } catch (error: any) {
        console.error("Error fetching results:", error.response || error.message);
        alert("Failed to fetch results from ChatGPT."); // Error handling
      } finally {
        setLoading(false); // Hide loading message after attempt
      }
    }

    fetchChatGPTResponse(); // Trigger the async call when component mounts
  }, [answers, questions, navigate]);

  // If answers or questions are still undefined, show a placeholder
  if (!answers || !questions) {
    return <p>Redirecting...</p>;
  }

  // Show loading message while awaiting API response
  if (loading) {
    return <p>Loading your career suggestions...</p>;
  }

  return (
    <div className="results-page">
      <h1>Your Detailed Career Assessment Results</h1>
      <p>Thanks for completing the assessment! Here are your answers:</p>

      {/* Display each question along with the user's answer */}
      <div className="user-answers">
        <ul>
          {questions.map((question: string, index: number) => (
            <li key={index}>
              <strong>{question}</strong>: {answers[index] || "No answer provided"}
            </li>
          ))}
        </ul>
      </div>

      {/* Render the GPT-generated HTML response as raw HTML */}
      <div className="chat-response">
        <h3>Career Suggestions:</h3>
        <div dangerouslySetInnerHTML={{ __html: chatResponse }} />
      </div>
    </div>
  );
}

export default DetailedResults;
