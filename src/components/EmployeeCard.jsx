import React from 'react';
import '../styles/EmployeeCard.css';

const EmployeeCard = ({ employee }) => {
  return (
    <div className="employee-card">
      <h3>{employee.name}</h3>
      <p>📞 {employee.phone}</p>
      <p>🎭 {employee.role}</p>
    </div>
  );
};

export default EmployeeCard;
