// components/EmployeeSelectionModal.js

import React, { useState, useEffect } from 'react';
import { getAllEmployees } from '../../services/employeeService';

const EmployeeSelectionModal = ({ isOpen, onClose }) => {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployees, setSelectedEmployees] = useState({});
  
  useEffect(() => {
    if (isOpen) {
      fetchEmployees();
    }
  }, [isOpen]);

  const fetchEmployees = async () => {
    try {
      const data = await getAllEmployees();
      setEmployees(data);
    } catch (error) {
      console.error('Failed to fetch employees:', error);
    }
  };

  const handleSelectEmployee = (employeeId) => {
    setSelectedEmployees({
      ...selectedEmployees,
      [employeeId]: !selectedEmployees[employeeId]
    });
  };

  const handleSelectAll = (isChecked) => {
    const allSelected = employees.reduce((acc, employee) => ({
      ...acc,
      [employee._id]: isChecked
    }), {});
    
    setSelectedEmployees(isChecked ? allSelected : {});
  };

  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Select Employees to Send Survey</h3>
        <div className="overflow-y-auto h-64">
          {employees.map(employee => (
            <div key={employee._id} className="flex justify-between items-center">
              <span>{employee.firstName} {employee.lastName}</span>
              <input
                type="checkbox"
                checked={!!selectedEmployees[employee._id]}
                onChange={() => handleSelectEmployee(employee._id)}
              />
            </div>
          ))}
        </div>
        <div className="flex justify-between items-center mt-4">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={employees.length > 0 && employees.every(emp => selectedEmployees[emp._id])}
              onChange={(e) => handleSelectAll(e.target.checked)}
            />
            <span>Select All</span>
          </label>
          <div className="modal-action">
            <button className="btn" onClick={onClose}>Close</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeSelectionModal;
