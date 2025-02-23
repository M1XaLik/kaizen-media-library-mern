import React, { useState } from "react";
import axios from "axios";

import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

// TO USE PUSH NOTIFICATIONS
import { toast } from "react-toastify";

import { motion } from "framer-motion";

// get SERVER URL from .env
const serverURL = process.env.REACT_APP_SERVER_URL;

const Register = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate(); // to navigate after registration

    const handleRegister = async (e) => {
        e.preventDefault(); // Prevent DEFAULT form behavior (page reloading)
        try {
            await axios.post(`${serverURL}/register`, { username, email, password });
            toast.success("Registration successful! Please log in.");
            navigate("/login");
        } catch (error) {
            toast.error("Registration failed. Please try again.");
        }
    };

    return (
        <motion.div
            initial={{ y: "100vh" }}
            animate={{ y: 0 }}
            transition={{ type: "tween", duration: 0.2, ease: "easeOut" }}
        >
            <div className="auth-page-card">
                <h1 className="above-auth-text">REGISTER</h1>
                <div className="login-form">
                    <form onSubmit={handleRegister}>
                        <div className="input-group">
                            <label>Username:</label>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>
                        <div className="input-group">
                            <label>Email:</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="input-group">
                            <label>Password:</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit">Register</button>
                    </form>
                    <Link to="/login" className="login-form-link">
                        Уже є акаунт? Бажаєте увійти?
                    </Link>
                </div>
            </div>
        </motion.div>
    );
};

export default Register;
