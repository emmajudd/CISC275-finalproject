import React from "react";
import "./ProgressBar.css";

interface ProgressBarProps {
  progress: number; 
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  const safeProgress = Math.max(0, Math.min(100, progress)); // Ensure progress between 0 and 100
  const roundedProgress = Math.round(safeProgress); // Round to nearest int

  return (
    <div className="progress-container">
      <div
        className="progress-bar"
        data-testid="progress-bar"
        style={{ width: `${roundedProgress}%` }} 
      >
        <span className="progress-text">{`${roundedProgress}%`}</span> 
      </div>
    </div>
  );
};

export default ProgressBar;