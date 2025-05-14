import React from "react";
import "./ProgressBar.css";

interface ProgressBarProps {
  progress: number; // Progress percentage (0 to 100)
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  // Clamp progress between 0 and 100
  const safeProgress = Math.max(0, Math.min(100, progress));
  const roundedProgress = Math.round(safeProgress); // Round to the nearest integer

  return (
    <div className="progress-container">
      <div
        className="progress-bar"
        data-testid="progress-bar"
        style={{ width: `${roundedProgress}%` }} // Dynamically set the width
      >
        <span className="progress-text">{`${roundedProgress}%`}</span> {/* Display rounded progress */}
      </div>
    </div>
  );
};

export default ProgressBar;