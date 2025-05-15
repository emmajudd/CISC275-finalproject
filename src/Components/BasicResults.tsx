// Portions of this component were generated with the assistance of an LLM
// Functionality includes handling route state, input validation and redirection, API communication with ChatGPT, and response state management

import React, { useEffect, useState } from "react"; 
import { useLocation, useNavigate } from "react-router-dom"; 
import axios from "axios"; 
import { useRef } from 'react';

function BasicResults() {
  const location = useLocation(); 
  const navigate = useNavigate();

  const { answers, questions } = location.state || {};

  const [chatResponse, setChatResponse] = useState<string>("");

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const pdfRef = useRef(null);
  
  let loading;
  if (typeof window !== "undefined") {
    try {
      loading = require('../Assets/loading.gif');
    } catch {
      loading = undefined;
    }
  }
  
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
        const formattedInput = questions
          .map(
            (question: string, index: number) =>
              `${question}: ${answers[index] || "No answer provided"}`
          )
          .join("\n");

        console.log("Formatted Input for ChatGPT:", formattedInput); 

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
        const chatGPTOutput =
      (
        response.data as {
          choices: { message: { content: string } }[];
        }
      ).choices[0]?.message?.content.trim() || "No response received.";

       console.log("ChatGPT Output:", chatGPTOutput); 
      // this cleans the output so that ticks don't appear in the results page
      const cleanedOutput = chatGPTOutput
        .replace(/^```(?:html)?/i, "")
        .replace(/```$/, "")
        .trim();

      setChatResponse(cleanedOutput); 

        
      } catch (error: any) {
        console.error("Error fetching results:", error.response || error.message);
        alert("Failed to fetch results from ChatGPT.");
      } finally {
        setIsLoading(false); 
      }
    }

    fetchChatGPTResponse(); 
  }, [answers, questions, navigate]); 

  if (!answers || !questions) {
    return <p>Redirecting...</p>;
  }

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

  return (
    <div className="results-container" style={{ paddingTop: "70px" }}>
      <div ref={pdfRef}>
        <h1>Your Career Assessment Results</h1>
        <p>Thanks for completing the assessment! Here are your answers:</p>
  
        {/* This displays user answers */}
        <div className="user-answers">
          <ul>
            {questions.map((question: string, index: number) => (
              <li key={index}>
                <strong>{question}</strong>: {answers[index] || "No answer provided"}
              </li>
            ))}
          </ul>
        </div>
  
        {/* This displays career advice */}
        <div className="chat-response">
          <div dangerouslySetInnerHTML={{ __html: chatResponse }} />
        </div>
        <div className="download-btn">
        <button onClick={() => window.print() }>Download PDF </button>
        </div>
        
      </div>
    </div>
  );
}

export default BasicResults;
