import React, { useEffect, useState } from 'react';
import { getEmployees } from '../services/employeeService';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    getEmployees()
      .then((response) => {
        setEmployees(response.data);
      })
      .catch((err) => {
        setError("Failed to fetch employees");
        console.error(err);
      });
  }, []);

  if (error) return <p>{error}</p>;

  return (
    <ul>
      {employees.map((employee) => (
        <li key={employee.id}>
          {employee.name} - {employee.email}
        </li>
      ))}
    </ul>
  );
};

export default EmployeeList;
