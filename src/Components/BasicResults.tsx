import React, { useEffect, useState } from "react"; 
import { useLocation, useNavigate } from "react-router-dom"; // For accessing route state and navigation
import axios from "axios"; // HTTP client for API requests
import { useRef } from 'react';



function BasicResults() {
  const location = useLocation(); // Hook to access the current location (and its state)
  const navigate = useNavigate(); // Hook for programmatic navigation

  // Destructure answers and questions from location.state, or default to undefined
  const { answers, questions } = location.state || {};

  // State for storing the ChatGPT API response
  const [chatResponse, setChatResponse] = useState<string>("");

  // State for indicating if the API request is still in progress
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const pdfRef = useRef(null);
  
  // Only require the image if running in the browser
  let loading;
  if (typeof window !== "undefined") {
    try {
      loading = require('../Assets/loading.gif');
    } catch {
      loading = undefined;
    }
  }
  
  // useEffect runs once on component mount
  useEffect(() => {
    // If required data is missing, redirect back to the basic assessment page
    if (!answers || !questions) {
      console.error("State is missing. Redirecting to BasicAssessment.");
      navigate("/basic-assessment");
      return;
    }

    // Async function to handle the API call to ChatGPT
    async function fetchChatGPTResponse() {
      const apiKey = localStorage.getItem("MYKEY"); // Retrieve API key from localStorage

      // If API key is missing, show an alert and redirect user
      if (!apiKey) {
        alert("API key is missing. Please set it on the homepage.");
        navigate("/basic-assessment");
        return;
      }

      try {
        // Format input for the ChatGPT prompt
        const formattedInput = questions
          .map(
            (question: string, index: number) =>
              `${question}: ${answers[index] || "No answer provided"}`
          )
          .join("\n");

        console.log("Formatted Input for ChatGPT:", formattedInput); // Debug log

        // Send POST request to ChatGPT with structured prompt
        const response = await axios.post(
          "https://api.openai.com/v1/chat/completions",
          {
            model: "gpt-4o", // Specify the model to use
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
            max_tokens: 1500, // Allow more tokens for detailed output
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${JSON.parse(apiKey)}`, // Secure authorization header
            },
          }
        );

        console.log("ChatGPT API Response:", response.data); // Debug log full API response

        // Extract the response text from the returned data structure
        const chatGPTOutput =
      (
        response.data as {
          choices: { message: { content: string } }[];
        }
      ).choices[0]?.message?.content.trim() || "No response received.";

       console.log("ChatGPT Output:", chatGPTOutput); // Debug log response output

      // CLEAN THE OUTPUT
      const cleanedOutput = chatGPTOutput
        .replace(/^```(?:html)?/i, "")
        .replace(/```$/, "")
        .trim();

      setChatResponse(cleanedOutput); // Save cleaned response to state

        
      } catch (error: any) {
        // Log and notify the user of any error
        console.error("Error fetching results:", error.response || error.message);
        alert("Failed to fetch results from ChatGPT.");
      } finally {
        setIsLoading(false); // Mark loading as complete
      }
    }

    fetchChatGPTResponse(); // Call the async function
  }, [answers, questions, navigate]); // Dependencies: re-run only if any of these change

  // If answers/questions are missing, show a redirecting message (though navigate should already trigger)
  if (!answers || !questions) {
    return <p>Redirecting...</p>;
  }

  // Show a loading message while waiting for API response
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

  // Render final results once loaded
  return (
    <div className="results-container" style={{ paddingTop: "70px" }}>
      <div ref={pdfRef}>
        <h1>Your Career Assessment Results</h1>
        <p>Thanks for completing the assessment! Here are your answers:</p>
  
        {/* Display user answers */}
        <div className="user-answers">
          <ul>
            {questions.map((question: string, index: number) => (
              <li key={index}>
                <strong>{question}</strong>: {answers[index] || "No answer provided"}
              </li>
            ))}
          </ul>
        </div>
  
        {/* Display ChatGPT-generated career advice */}
        <div className="chat-response">
          <div dangerouslySetInnerHTML={{ __html: chatResponse }} />
        </div>
        {/*<button onClick={handleDownloadPDF} style={{ marginBottom: '20px' }}>*/}
        <div className="download-btn">
        <button onClick={() => window.print() }>Download PDF </button>
        </div>
        
      </div>
    </div>
  );
}

export default BasicResults;
