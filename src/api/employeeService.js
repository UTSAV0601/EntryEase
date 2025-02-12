import axios from "axios";

const API_URL = "http://localhost:5000/employees";

export const fetchEmployees = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching employees:', error);
    return [];
  }
};

export const addEmployee = async (employeeData) => {
  const response = await axios.post(API_URL, employeeData);
  return response.data;
};
