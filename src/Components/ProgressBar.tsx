import React from "react";
import "./ProgressBar.css";


interface ProgressBarProps {
 progress: number;
}
//expects a porgressbarprop that is a number up to 100 and not past 0


const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
 const safeProgress = Math.max(0, Math.min(100, progress)); // Ensure progress between 0 and 100
 const roundedProgress = Math.round(safeProgress); // Round to nearest int


 return (
   //container for the progress bar
   <div className="progress-container">
     <div
       className="progress-bar"
       data-testid="progress-bar"
       style={{ width: `${roundedProgress}%` }}
     >
       {/*progress bar that controls the color of the progress bar*/}
       <span className="progress-text">{`${roundedProgress}%`}</span>
     </div>
   </div>
 );
};


export default ProgressBar;