import React from 'react';
import '../styles/Documentation.css';

const Documentation = () => {
  return (
    <div className="container">
      <h1>GlobalLogic Onboarding Documentation</h1>

      <section>
        <h2>Welcome to GlobalLogic!</h2>
        <p>
          This documentation will guide you through the onboarding process and provide you with the necessary resources to get started.
        </p>
      </section>

      <section>
        <h2>Getting Started</h2>
        <ul>
          <li>Complete your profile on the company portal.</li>
          <li>Set up your official email and communication channels.</li>
          <li>Read the company policies and code of conduct.</li>
          <li>Attend the onboarding sessions and training programs.</li>
        </ul>
      </section>

      <section>
        <h2>Important Resources</h2>
        <ul>
          <li>
            <a href="https://www.globallogic.com/" target="_blank" rel="noopener noreferrer">
              Official GlobalLogic Website
            </a>
          </li>
          <li>
            <a href="/documents/employee-handbook.pdf" target="_blank">
              Employee Handbook (PDF)
            </a>
          </li>
          <li>
            <a href="/documents/code-of-conduct.pdf" target="_blank">
              Code of Conduct
            </a>
          </li>
          <li>
            <a href="/documents/hr-policies.pdf" target="_blank">
              HR Policies
            </a>
          </li>
        </ul>
      </section>

    </div>
  );
};

export default Documentation;
