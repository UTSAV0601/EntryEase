import React from 'react';

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

      <section>
        <h2>FAQs</h2>
        <div className="faq">
          <h3>1. How do I access my company email?</h3>
          <p>
            You will receive an email from the IT department with setup instructions. If you haven't received it, contact <strong>it-support@globallogic.com</strong>.
          </p>
        </div>

        <div className="faq">
          <h3>2. Where do I report issues during onboarding?</h3>
          <p>
            You can reach out to the HR team via the <strong>HR Helpdesk</strong> at <a href="mailto:hr@globallogic.com">hr@globallogic.com</a>.
          </p>
        </div>

        <div className="faq">
          <h3>3. What are the working hours?</h3>
          <p>
            The standard working hours are 9:00 AM - 6:00 PM, Monday to Friday. Check with your manager for any specific changes.
          </p>
        </div>

        <div className="faq">
          <h3>4. How do I request leave?</h3>
          <p>
            You can request leave via the company HR portal under the "Leave Management" section.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Documentation;
