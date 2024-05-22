// src/components/TotalEmployeesStat.js
import React, { useEffect, useState } from 'react';
import { getAllEmployees } from '../../services/employeeService';
import axios from 'axios';
import { toast } from 'react-toastify';
import { UsersIcon } from '@heroicons/react/24/solid'


const TotalEmployeesStat = () => {
    const [totalEmployees, setTotalEmployees] = useState("");
    const companyId = localStorage.getItem("companyId")

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v2/employees/${companyId}`)
                const employees = response.data.employees.filter(employee => !employee.isDeleted);
                setTotalEmployees(employees)
            } catch (error) {
                console.error('Failed to fetch employees:', error);
            }
        };

        fetchEmployees();
    }, []);
    return (
        <div className="flex bg-white flex-col w-full p-4 bg-card border border-bsrate shadow rounded-lg ">
            <div className="flex flex-row bg-white  items-center justify-start mb-4">
                <UsersIcon className="h-4 w-4 mr-2 text-indigo-600" />
                <h3 className="text-sm font-semibold text-bsrate">Employés</h3>
            </div>
            <div className=" w-full min-w-full max-w-full flex flex-col">
                <div className="text-3xl font-bold text-bsrate">{totalEmployees.length}</div>
                <p className="text-xs text-slate-500">importé(s) sur BackstageRate</p>

            </div>
        </div>
    );
};

export default TotalEmployeesStat;
