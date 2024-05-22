import axios from "axios";
import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [authData, setAuthData] = useState(null);
    const [loading, setLoading] = useState(true); // Add a loading state


    const token = localStorage.getItem("token");

    useEffect(() => {
        if (token) {
            setAuthData({ token });
        }
        setLoading(false); // Set loading to false after checking the token
    }, [token]);

    const signIn = (token) => {
        localStorage.setItem("token", token);
        setAuthData({ token });
    };

    const signOut = () => {
        localStorage.removeItem("token");
        setAuthData(null);
    };

    if (loading) {
        return <div></div>; // or some other loading indicator
    }

    return (
        <AuthContext.Provider value={{ authData, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
