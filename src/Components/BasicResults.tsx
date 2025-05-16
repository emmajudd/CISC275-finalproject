// Portions of this component were generated with the assistance of chatgpt
// Functionality includes handling route state, input validation and redirection, API communication with ChatGPT, and response state management

import React, { useEffect, useState } from "react"; 
import { useLocation, useNavigate } from "react-router-dom"; 
import axios from "axios"; 
import { useRef } from 'react';

function BasicResults() {
  // Access route state & navigation functions
  const location = useLocation(); 
  const navigate = useNavigate();

  const { answers, questions } = location.state || {};

  // State for ChatGPT response & loading indicator
  const [chatResponse, setChatResponse] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Ref for PDF printing
  const pdfRef = useRef(null);
  
  // Load gif only if running in browser 
  let loading;
  if (typeof window !== "undefined") {
    try {
      loading = require('../Assets/loading.gif');
    } catch {
      loading = undefined;
    }
  }
  
  // Fetch and format data when component mounts
  useEffect(() => {
    // If required data is missing then redirect
    if (!answers || !questions) {
      console.error("State is missing. Redirecting to BasicAssessment.");
      navigate("/basic-assessment");
      return;
    }

    // Async function to call ChatGPT API
    async function fetchChatGPTResponse() {
      const apiKey = localStorage.getItem("MYKEY"); 

      // Alert if API key is missing
      if (!apiKey) {
        alert("API key is missing. Please set it on the homepage.");
        navigate("/basic-assessment");
        return;
      }

      try {
        // Format questions and answers 
        const formattedInput = questions
          .map(
            (question: string, index: number) =>
              `${question}: ${answers[index] || "No answer provided"}`
          )
          .join("\n");

        console.log("Formatted Input for ChatGPT:", formattedInput); 

        // Call OpenAI's ChatGPT API
        const response = await axios.post(
          "https://api.openai.com/v1/chat/completions",
          {
            model: "gpt-4o", 
            messages: [
              {
                role: "system",
                content: `You are a career advisor. Provide career suggestions based on the user's answers to the following questions. 
                Format the response in HTML and include inline styles or CSS class names for styling. Do not mention the guidelines or html use.
                Use the following CSS guidelines:
                - Use a clean and professional layout.
                - Highlight job titles in bold and larger font sizes.
                - List job descriptions, salaries, and other details.
                - Add spacing and padding for readability.
                  Light Mode Colors:
                  - Page background: rgb(255, 255, 255)
                  - Headings: rgb(247, 200, 194)
                  -Font Color: rgb(0, 0, 0)

                  Dark Mode Colors:
                  - Page background: rgb(116, 103, 103)
                  - Headings: rgb(247, 200, 194)
                  - Font color: rgb(255, 255, 255)
                  
                - Go in-depth on requirements and responsibilities.
                - Provide a summary of the user's strengths and how they relate to the suggested careers.`,
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

        console.log("ChatGPT API Response:", response.data); 

        // clean ChatGPT output
        const chatGPTOutput =
          (
            response.data as {
              choices: { message: { content: string } }[];
            }
          ).choices[0]?.message?.content.trim() || "No response received.";

        console.log("ChatGPT Output:", chatGPTOutput); 

        // Remove ```html from results
        const cleanedOutput = chatGPTOutput
          .replace(/^```(?:html)?/i, "")
          .replace(/```$/, "")
          .trim();

        // Set result to state
        setChatResponse(cleanedOutput); 
      } catch (error: any) {
        console.error("Error fetching results:", error.response || error.message);
        alert("Failed to fetch results from ChatGPT.");
      } finally {
        setIsLoading(false); // Hide loader
      }
    }

    fetchChatGPTResponse(); 
  }, [answers, questions, navigate]); 

  if (!answers || !questions) {
    return <p>Redirecting...</p>;
  }

  // Display loading indicator while waiting for response
  if (isLoading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '60vh',
        width: '100%',
      }}>
        {loading ? (
          <img src={loading} alt="Loading..." style={{ width: '100px', height: '100px' }} />
        ) : (
          <div style={{ fontSize: '1.5rem', color: '#888' }}>Loading...</div>
        )}
      </div>
    );
  }

  // Render once results are ready
  return (
    <div className="results-container" style={{ paddingTop: "70px" }}>
      <div ref={pdfRef}>
        <h1>Your Career Assessment Results</h1>
        <p>Thanks for completing the assessment! Here are your answers:</p>
  
        {/* Display each question with its corresponding answer */}
        <div className="user-answers">
          <ul>
            {questions.map((question: string, index: number) => (
              <li key={index}>
                <strong>{question}</strong>: {answers[index] || "No answer provided"}
              </li>
            ))}
          </ul>
        </div>
  
        {/* Render ChatGPT's career advice response */}
        <div className="chat-response">
          <div dangerouslySetInnerHTML={{ __html: chatResponse }} />
        </div>

        {/* Button to print the current page to PDF */}
        <div className="download-btn">
          <button onClick={() => window.print() }>Download PDF</button>
        </div>
      </div>
    </div>
  );
}

export default BasicResults;
