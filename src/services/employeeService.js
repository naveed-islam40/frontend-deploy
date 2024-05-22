// src/services/employeeService.js
import axios from 'axios';

const baseUrl = `${process.env.REACT_APP_BACKEND_URL}/employee`;


const getAllEmployees = async () => {
  try {
    const response = await axios.get(`${baseUrl}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const addEmployee = async (employeeData) => {
  try {
    const response = await axios.post(`${baseUrl}/add`, employeeData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const addEmployeesCSV = async (file) => {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await axios.post(`${baseUrl}/add-csv`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export { getAllEmployees, addEmployee, addEmployeesCSV };
