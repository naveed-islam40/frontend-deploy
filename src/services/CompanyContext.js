import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const CompanyContext = createContext();

export const useCompany = () => useContext(CompanyContext);

export const CompanyProvider = ({ children }) => {
  const [companyName, setCompanyName] = useState(localStorage.getItem('companyName') || '');
  const [companyLogo, setCompanyLogo] = useState(localStorage.getItem('companyLogo') || '');

  const adminId = localStorage.getItem("userId");
  const companyId = localStorage.getItem("companyId");

  useEffect(() => {
    const fetchCompanyData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v2/company/${companyId}`);
        if (response.data && response.data.company) {
          const { name, image } = response.data.company;
          setCompanyName(name);
          setCompanyLogo(image);
          localStorage.setItem('companyName', name);
          localStorage.setItem('companyLogo', image);
        }
      } catch (error) {
        console.error('Error fetching company data:', error);
      }
    };

    fetchCompanyData();
  }, [companyId]);

  return (
    <CompanyContext.Provider value={{ companyName, companyLogo }}>
      {children}
    </CompanyContext.Provider>
  );
};
