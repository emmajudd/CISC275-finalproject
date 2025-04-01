import React from 'react';
import './ProgressBar.css';

interface ProgressBarProps {
  progress: number; // percentage from 0 to 100
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  return (
    <div className="progress-container">
      <div className="progress-bar" style={{ width: `${progress}%` }}>
        <span className="progress-text">{Math.round(progress)}%</span>
      </div>
    </div>
  );
};
//
export default ProgressBar; 