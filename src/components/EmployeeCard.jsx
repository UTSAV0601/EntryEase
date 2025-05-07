import React from 'react';
import '../styles/EmployeeCard.css';

const EmployeeCard = ({ employee, onOffboard }) => {
  return (
    <div className="employee-card">
      <h3>{employee.name}</h3>
      <p>Manager: {employee.manager}</p>
      <p>Location: {employee.location}</p>
      <p>Status: {employee.status}</p>
      {employee.status === 'Active' && (
        <button onClick={() => onOffboard(employee._id)}>Offboard</button>
      )}
    </div>
  );
};

export default EmployeeCard;

