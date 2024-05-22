import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import React, { useEffect, useState } from "react";
import EditCompanyModal from "./EditCompany";
import PricingBox from "./PricingBox";

function PlansSection() {
    const [companies, setCompanies] = useState([]);
    const [editingCompany, setEditingCompany] = useState(null);
    const [triggerRefresh, setTriggerRefresh] = useState(false);
    // const [companyId, setCompanyId] = useState("")
    const adminId = localStorage.getItem("userId");
    const companyId = localStorage.getItem("companyId");
    console.log("adminId company", adminId)

    useEffect(() => {
        const fetchCompanies = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v2/companies/${adminId}`);
                    setCompanies(response.data); // No need to wrap response.data in an array
                console.log("company list", response.data)
            } catch (error) {
                console.error("Error fetching companies:", error);
            }
        };
        if (adminId) { // Check if adminId is truthy before making the request
            fetchCompanies();
        }
    }, [adminId]);


    const handleUpdateCompany = async (event, employee) => {
        event.preventDefault();
        try {
            const response = await axios.put(
                `${process.env.REACT_APP_BACKEND_URL}/api/v2/update/company/${employee._id}`,
                { employee }
            );
            if (response.ok) {
                const updatedCompany = await response.json();
                setCompanies((prev) =>
                    prev.map((emp) =>
                        emp._id === updatedCompany._id ? updatedCompany : emp
                    )
                );
                setEditingCompany(null); // Close modal
            }
            setTriggerRefresh((prev) => !prev); // Add this line
        } catch (error) {
            console.error("Error updating Company:", error);
        }
    };

    const getEmployeeId = (companyId) => {
        // setCompanyId(companyId)
    }
    return (
        <div className="p-6 px-8">
            <h3 className="text-lg font-semibold text-slate-900">Mon abonnement</h3>
            <p className="text-slate-500">Gérez votre abonnement à BackstageRate</p>
        <PricingBox />
        </div>
        

    );
}

export default PlansSection;