import { useEffect, useState } from "react";
import React from "react";

import Loader from "./components/Loader";

import { motion } from "framer-motion";
import axios from "axios";

// button component
import LogoutButton from "./components/logoutButton";

// get SERVER URL from .env
const serverURL = process.env.REACT_APP_SERVER_URL;

const UserProfilePage = () => {
    const [username, setUserName] = useState();
    const [useremail, setUserEmail] = useState();

    // STATE for LOADER
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Function to fetch user data from the server
        const fetchUserData = async () => {
            try {
                // Retrieve the token from localStorage
                const token = localStorage.getItem("token");

                // Check if token exists
                if (!token) {
                    console.log("No token found, please log in");
                    return;
                }

                // Send a GET request with the Authorization header
                const response = await axios.get(`${serverURL}/user`, {
                    headers: {
                        Authorization: `Bearer ${token}`, // use token to ASK for USER DATA
                    },
                });

                // LOG OUT THE RESPONSE
                // console.log("Response:", response);

                // Assign received data to the variable
                const data = await response.data;
                // console.log("data.user: ", data.user);

                // If response is not OK, throw an error
                if (!data.user) {
                    console.log("Response data does not contain user object");
                }

                // console.log("User data:", data.user);
                // console.log("User ID:", data.user._id);
                // console.log("User Username:", data.user.username);
                // console.log("User Email:", data.user.email);

                // CHANGE THE WEBSITE TITLE
                document.title = `Kaizen • ${data.user.username}`;

                // Set the user data state with the received data
                setUserName(data.user.username);
                setUserEmail(data.user.email);
            } catch (error) {
                // console.log("Error fetching data: ", error);
                setIsLoading(false);
            } finally {
                setIsLoading(false);
            }
        };

        // Call the function to fetch data
        fetchUserData();
    }, []);

    if (isLoading) {
        return <Loader />; // Show Loader before animation
    }

    return (
        <motion.div
            initial={{ y: "100vh" }}
            animate={{ y: 0 }}
            transition={{ type: "tween", duration: 0.2, ease: "easeOut" }}
        >
            <div className="page-content">
                <div className="user-profile">
                    <h2>
                        <i className="fa-solid fa-user fa-2x" style={{ color: "white" }}></i>
                    </h2>
                    {/* <img src="" alt="avatar" className="user-avatar" /> */}
                    <h2 className="user-nickname">{username}</h2>
                    <p className="user-email">{useremail}</p>
                    {/* <p className="user-join-date">Дата приєднання: 22 Січня 2025</p> */}

                    {/* import button  */}
                    <LogoutButton />
                </div>
            </div>
        </motion.div>
    );
};

export default UserProfilePage;
