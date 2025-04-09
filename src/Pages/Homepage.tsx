import React, {useState} from "react";
import { useNavigate} from "react-router-dom"
import "./Homepage.css"; // Import CSS for styling
import { Button, Form } from "react-bootstrap";
import axios from "axios"; // Import axios for API requests

//local storage and API Key: key should be entered in by the user and will be stored in local storage (NOT session storage)
const saveKeyData = "MYKEY";
const prevKey = localStorage.getItem(saveKeyData);
let keyData = "";

if (prevKey !== null) {
  keyData = JSON.parse(prevKey);
}


const HomePage = () => {
  const navigate = useNavigate();
  const [key, setKey] = useState<string>(keyData);
  const [userInput, setUserInput] = useState<string>(""); // State for user input
  const [chatResponse, setChatResponse] = useState<string>(""); // State for ChatGPT response

    //sets the local storage item to the api key the user inputed
  function handleSubmit() {
    localStorage.setItem(saveKeyData, JSON.stringify(key));
    window.location.reload();
  }

    //whenever there's a change it'll store the api key in a local state called key but it won't be set in the local storage until the user clicks the submit button
  function changeKey(event: React.ChangeEvent<HTMLInputElement>) {
    setKey(event.target.value);
  }

  // Function to handle ChatGPT API call
  async function handleChatSubmit() {
    if (!key) {
      alert("Please provide a valid API key.");
      return;
    }

    try {
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-3.5-turbo", // Use the chat-based model
          messages: [
            { role: "system", content: "You are a helpful career assistant." },
            { role: "user", content: userInput },
          ],
          max_tokens: 150,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${key}`, // Use the API key
          },
        }
      );
      console.log("API Response:", response.data); // Log the full response for debugging
      const data = response.data as {
        choices: { message: { content: string } }[];
      };
      setChatResponse(data.choices[0]?.message?.content.trim() || "No response received.");
    } catch (error: any) {
      console.error("Error calling ChatGPT API:", error.response || error.message);
      alert(
        `Failed to fetch response from ChatGPT. ${
          error.response?.data?.error?.message || error.message
        }`
      );
    }
  }

  return (
    <div className="homepage">
      <h1>The Career Helpi</h1>
      
      <div className="question-container">
        {/* Basic Questions Section */}
        <section className="basic-questions">
          <h2>Basic Questions</h2>
          <p>Answer basic questions to help you find your ideal career.</p>
          <Button onClick={() => navigate("/basic-assessment")}>
            Go to Basic Questions
          </Button>
        </section>
        
        {/* Detailed Questions */}
        <section className="detailed-questions">
          <h2>Detailed Questions</h2>
          <p>Answer detailed questions to help you find your ideal career.</p>
          <Button onClick={() => navigate("/detailed-assessment")}>
            Go to Detailed Questions
          </Button>
        </section>
      </div>
      {/* API Key Form - Only shown on the homepage */}
      <div className="api-key-form">
        <Form>
          <Form.Label>API Key:</Form.Label>
          <Form.Control
            type="password"
            placeholder="Insert API Key Here"
            value={key}
            onChange={changeKey}
          />
          <br />
          <Button className="Submit-Button" onClick={handleSubmit}>
            Submit
          </Button>
        </Form>
      </div>

      <div className="chatgpt-container">
        <h2>Chat with Career Helper</h2>
        <Form>
          <Form.Control
            type="text"
            placeholder="Ask a question..."
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
          />
          <br />
          <Button onClick={handleChatSubmit}>Send</Button>
        </Form>
        {chatResponse && (
          <div className="chat-response">
            <h3>Response:</h3>
            <p>{chatResponse}</p>
          </div>
        )}
      </div>

    </div>
  );
};

export default HomePage;