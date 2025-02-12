import React, { useState, useEffect } from 'react';
import Progress from '../components/Progress';
import { fetchEmployees } from '../api/employeeService.js';

const ProgressTracker = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const loadProgress = async () => {
      try {
        const data = await fetchEmployees();
        setProgress(data.progress);
      } catch (error) {
        console.error('Error fetching progress:', error);
      }
    };

    loadProgress();
  }, []);

  return (
    <div>
      <h1>Employee Onboarding Progress</h1>
      <Progress progress={progress} />
    </div>
  );
};

export default ProgressTracker;

