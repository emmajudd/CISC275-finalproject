import React from "react";
import "./Homepage.css"; // Import CSS for styling

const HomePage = () => {
  return (
    <div className="homepage">
      <h1>The Career Helpi</h1>
      
      <div className="basic-questions">
        {/* Basic Questions Section */}
        <section className="basic-questions">
          <h2>Basic Questions</h2>
          <p>Answer basic questions to help you find your ideal career.</p>
          <button>Go to Basic Questions</button>
        </section>
        
        {/* Detailed Questions */}
        <section className="detailed-questions">
          <h2>Detailed Questions</h2>
          <p>Answer more detailed questions to help you find your ideal career.</p>
          <button>Go to Detailed Questions</button>
        </section>
      </div>

    </div>
  );
};

export default HomePage;