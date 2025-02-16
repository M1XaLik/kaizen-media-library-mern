import React from "react";
import { Navigate } from "react-router-dom";

// to CHECK if the USER is Authenticated
const isAuthenticated = () => {
    // !!"hello" - returns TRUE
    return !!localStorage.getItem("token"); // CHECK if TOKEN EXISTS
};

// CHILDREN might be ANY children COMPONENT
const AuthWrapper = ({ children }) => {
    // if the user is not Authenticated REDIRECT him to the AUTH PAGE
    return isAuthenticated() ? children : <Navigate to="/auth" />;
};

export default AuthWrapper;
