import React, { createContext, useState, useEffect } from 'react';
import { fetchEmployees } from '../api/employeeService.js';

export const EmployeeContext = createContext();

export const EmployeeProvider = ({ children }) => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadEmployees = async () => {
      try {
        const data = await fetchEmployees();
        setEmployees(data);
      } catch (error) {
        console.error('Error fetching employees:', error);
      } finally {
        setLoading(false);
      }
    };
    loadEmployees();
  }, []);

  const addEmployee = (employee) => {
    setEmployees([...employees, { id: employees.length + 1, ...employee }]);
  };

  return (
    <EmployeeContext.Provider value={{ employees, addEmployee, loading }}>
      {children}
    </EmployeeContext.Provider>
  );
};
