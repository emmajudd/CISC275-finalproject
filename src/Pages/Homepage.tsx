import React from "react";
import { useNavigate} from "react-router-dom"

import "./Homepage.css"; // Import CSS for styling

const HomePage = () => {
  const navigate = useNavigate();
  return (
    <div className="homepage">
      <h1>The Career Helpi</h1>
      
      <div className="question-container">
        {/* Basic Questions Section */}
        <section className="basic-questions">
          <h2>Basic Questions</h2>
          <p>Answer basic questions to help you find your ideal career.</p>
          <button onClick={() => navigate("/basic-assessment")}>
            Go to Basic Questions
          </button>
        </section>
        
        {/* Detailed Questions */}
        <section className="detailed-questions">
          <h2>Detailed Questions</h2>
          <p>Answer more detailed questions to help you find your ideal career.</p>
          <button onClick={() => navigate("/detailed-assessment")}>
            Go to Detailed Questions
          </button>
        </section>
      </div>

    </div>
  );
};

export default HomePage;