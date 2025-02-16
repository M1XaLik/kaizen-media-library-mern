import React from "react";
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Видалити токен з локального сховища
        localStorage.removeItem("token");

        // Перенаправити користувача на сторінку логіну
        navigate("/login");
    };

    return (
        <button onClick={handleLogout} className="logout-button">
            Logout
        </button>
    );
};

export default LogoutButton;
