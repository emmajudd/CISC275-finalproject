import React, {useState} from "react";
import { useNavigate} from "react-router-dom"
import "./Homepage.css"; // Import CSS for styling
import { Button, Form } from "react-bootstrap";

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

    //sets the local storage item to the api key the user inputed
  function handleSubmit() {
    localStorage.setItem(saveKeyData, JSON.stringify(key));
    window.location.reload();
  }

    //whenever there's a change it'll store the api key in a local state called key but it won't be set in the local storage until the user clicks the submit button
  function changeKey(event: React.ChangeEvent<HTMLInputElement>) {
    setKey(event.target.value);
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
          <p>Answer more detailed questions to help you find your ideal career.</p>
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

    </div>
  );
};

export default HomePage;