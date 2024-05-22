import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./authContext";

const ProtectedRoute = ({ element: Component, ...rest }) => {
    const { authData, loading } = useAuth();

    const token = localStorage.getItem("token");

    // Handle loading state more explicitly
    if (loading) {
        return <div>Loading...</div>; // Or replace with a spinner or similar component
    }

    return authData || token ? (
        <Component {...rest} />
    ) : (
        <Navigate to="/signin" />
    );
};

export default ProtectedRoute;
