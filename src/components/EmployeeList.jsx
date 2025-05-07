import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EmployeeCard from './EmployeeCard';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [offboardedEmployees, setOffboardedEmployees] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/employees')
      .then(response => {
        const activeEmployees = response.data.filter(emp => emp.status === 'Active');
        const offboarded = response.data.filter(emp => emp.status === 'Offboarded');
        setEmployees(activeEmployees);
        setOffboardedEmployees(offboarded);
      })
      .catch(err => console.log(err));
  }, []);

  const handleOffboard = (id) => {
    axios.put(`http://localhost:5000/employees/${id}`, { status: 'Offboarded' })
      .then(response => {
        setEmployees(prevState => prevState.filter(emp => emp._id !== id));
        setOffboardedEmployees(prevState => [...prevState, response.data]);
      })
      .catch(err => console.log(err));
  };

  return (
    <div>
      <h2>Active Employees</h2>
      {employees.map((emp) => (
        <EmployeeCard key={emp._id} employee={emp} onOffboard={handleOffboard} />
      ))}

      <h2>Offboarded Employees</h2>
      {offboardedEmployees.map((emp) => (
        <EmployeeCard key={emp._id} employee={emp} onOffboard={() => {}} />
      ))}
    </div>
  );
};

export default EmployeeList;
