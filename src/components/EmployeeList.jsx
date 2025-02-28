import React, { useContext } from 'react';
import { EmployeeContext } from '../context/EmployeeContext';
import EmployeeCard from './EmployeeCard';

const EmployeeList = () => {
  const { employees, loading } = useContext(EmployeeContext);

  if (loading) return <p>Loading employees...</p>;

  return (
    <div>
      {employees.length === 0 ? <p>No employees found.</p> : employees.map((emp) => <EmployeeCard key={emp.id} employee={emp} />)}
    </div>
  );
};

export default EmployeeList;
