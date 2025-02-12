import React from 'react';
import '../styles/Progress.css';

const Progress = ({ progress }) => {
  return (
    <div className="progress-container">
      <h2>Onboarding Progress</h2>
      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <p>{progress}% Completed</p>
    </div>
  );
};

export default Progress;
