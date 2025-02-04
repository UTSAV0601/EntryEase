import React, { useState } from 'react';
import EmployeeForm from '../components/EmployeeForm';
import EmployeeList from '../components/EmployeeList';

const Employees = () => {
  const [employees, setEmployees] = useState([]);

  const handleAddEmployee = (employee) => {
    setEmployees([...employees, { id: Date.now(), ...employee }]);
  };

  return (
    <div>
      <h2>Employee Management</h2>
      <EmployeeForm onAddEmployee={handleAddEmployee} />
      <EmployeeList employees={employees} />
    </div>
  );
};

export default Employees;
