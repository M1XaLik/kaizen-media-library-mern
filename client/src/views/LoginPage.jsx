import React, { useState } from "react";
import axios from "axios";

import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

// TO USE PUSH NOTIFICATIONS
import { toast } from "react-toastify";

import { motion } from "framer-motion";

// get SERVER URL from .env
const serverURL = process.env.REACT_APP_SERVER_URL;

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate(); // to navigate after login

    // Function to handle login
    const handleLogin = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        try {
            const response = await axios.post(`${serverURL}/login`, { username, password });
            localStorage.setItem("token", response.data.token); // Store the token in localStorage
            toast.success("Login successful!");
            navigate("/");
        } catch (error) {
            toast.error("Login failed. Please check your credentials."); // Set error message
        }
    };

    return (
        <motion.div
            initial={{ y: "100vh" }}
            animate={{ y: 0 }}
            transition={{ type: "tween", duration: 0.2, ease: "easeOut" }}
        >
            <div className="auth-page-card">
                <div className="above-auth-text">Login</div>
                <hr />
                <div className="login-form">
                    <form onSubmit={handleLogin}>
                        {/* USERNAME  */}
                        <div className="input-group">
                            <label>Username:</label>
                            <input
                                id="username"
                                type="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>

                        {/* PASSWORD  */}
                        <div className="input-group">
                            <label>Password:</label>
                            <input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit">Login</button>
                    </form>
                    <Link to="/register" className="login-form-link">
                        Немає акаунту? Бажаєте зареєструватись?
                    </Link>
                </div>
            </div>
        </motion.div>
    );
};

export default Login;
