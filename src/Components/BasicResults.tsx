import React, { useEffect, useState } from "react"; 
import { useLocation, useNavigate } from "react-router-dom"; // For accessing route state and navigation
import axios from "axios"; // HTTP client for API requests
import loading from '../Assets/loading.gif'; // Loading GIF for user feedback
//import jsPDF from 'jspdf';
//import html2canvas from 'html2canvas';
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

  /*
const handleDownloadPDF = async () => {
  if (!pdfRef.current) return;

  const element = pdfRef.current as HTMLElement;
  const canvas = await html2canvas(element);
  const imgData = canvas.toDataURL('image/png');
  const pdf = new jsPDF('p', 'mm', 'a4');

  const imgProps = pdf.getImageProperties(imgData);
  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

  pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
  pdf.save('career-assessment-results.pdf');
};
*/

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
            model: "gpt-3.5-turbo", // Specify the model to use
            messages: [
              {
                role: "system",
                content: `You are a career advisor. Provide career suggestions based on the user's answers to the following questions. 
                Format the response in HTML and include inline styles or CSS class names for styling. 
                Use the following CSS guidelines:
                - Use a clean and professional layout.
                - Highlight job titles in bold and larger font sizes.
                - Use a table for listing job descriptions, salaries, and other details.
                - Add spacing and padding for readability.
                - Use colors like rgb(30, 27, 55) for headings and #f0f0f0 for table backgrounds.
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
        setChatResponse(chatGPTOutput); // Save response to state
        
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

  // Show a loading message whxile waiting for API response
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
          style={{ width: "100px", height: "100px" }} // Adjust size here
        />
      </div>
    );
  }

  // Render final results once loaded
  return (
    <div className="results-container">
     
  
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
        
        <button onClick={() => window.print() }>Download PDF </button>

        
      </div>
    </div>
  );
}

export default BasicResults;
