import React, { useState, useContext } from 'react';
import { EmployeeContext } from '../context/EmployeeContext';
import '../styles/EmployeeForm.css';

const EmployeeForm = () => {
  const { addEmployee } = useContext(EmployeeContext);
  const [employee, setEmployee] = useState({ name: '', phone: '', role: '' });

  const handleChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addEmployee(employee);
    setEmployee({ name: '', phone: '', role: '' });
  };

  return (
    <form className="employee-form" onSubmit={handleSubmit}>
      <h2>Add New Employee</h2>
      <input type="text" name="name" placeholder="Name" value={employee.name} onChange={handleChange} required />
      <input type="text" name="phone" placeholder="Phone" value={employee.phone} onChange={handleChange} required />
      <input type="text" name="role" placeholder="Role" value={employee.role} onChange={handleChange} required />
      <button type="submit">Add Employee</button>
    </form>
  );
};

export default EmployeeForm;
