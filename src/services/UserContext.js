import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    firstName: localStorage.getItem('userFirstName') || '',
    lastName: localStorage.getItem('userLastName') || '',
    image: localStorage.getItem('userImage') || ''
  });

  const adminId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v2/admin/get/${adminId}`);
        if (response.data && response.data.admin) {
          const { firstName, lastName, image } = response.data.admin;
          setUser({ firstName, lastName, image });
          localStorage.setItem('userFirstName', firstName);
          localStorage.setItem('userLastName', lastName);
          localStorage.setItem('userImage', image);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [adminId]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
