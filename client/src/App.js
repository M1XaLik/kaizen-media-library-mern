import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import axios from "axios";

// to use NOTIFICATION
import { ToastContainer } from "react-toastify";

import AuthWrapper from "./views/components/AuthWrapper";

import AuthPageCard from "./views/AuthPage";
import Register from "./views/RegisterPage";
import Login from "./views/LoginPage";

// NAVBAR
import Navbar from "./views/components/Navbar";

// PAGES
import MainPage from "./views/MainPage";
import LibraryPage from "./views/LibraryPage";
import UploadMediaPage from "./views/UploadMediaPage";
import MediaDetailsPage from "./views/ViewMediaPage";
import UserProfilePage from "./views/UserPage";

// ADMIN PAGES
import AdminPanelPage from "./views/AdminPanelPage";
import AdminEditMediaPage from "./views/AdminEditMediaPage";

import { useEffect, useState } from "react";

function App() {
    // USE THIS to know IF USER IS ADMIN or NOT
    const [isAdmin, setIsAdmin] = useState(false);

    const location = useLocation();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem("token");

                if (!token) {
                    return;
                }

                // fetch User route from SERVER to get his role
                const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/user`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                const data = response.data;

                // console.log("data.user.admin:", data.user.admin);

                // if user exists && is ADMIN
                if (data.user && data.user.admin) {
                    setIsAdmin(true);
                }
            } catch (error) {
                // console.log("Error fetching user data:", error);
            }
        };

        fetchUserData();
    });

    // List of pages where the Navbar should not be displayed
    const hiddenNavbarPaths = ["/auth", "/register", "/login"];

    return (
        <>
            {/* TO HIDE NAVBAR ON THE SPECIFIC PAGES  */}
            {hiddenNavbarPaths.includes(location.pathname) ? null : <Navbar isAdmin={isAdmin} />}
            <ToastContainer />
            <Routes>
                <Route exact path="/auth" element={<AuthPageCard />} />
                <Route exact path="/register" element={<Register />} />
                <Route exact path="/login" element={<Login />} />

                <Route
                    exact
                    path="/"
                    element={
                        <AuthWrapper>
                            <MainPage />
                        </AuthWrapper>
                    }
                />
                <Route
                    exact
                    path="/library"
                    element={
                        <AuthWrapper>
                            <LibraryPage isAdmin={isAdmin} />
                        </AuthWrapper>
                    }
                />
                <Route
                    path="/medias/:id"
                    element={
                        <AuthWrapper>
                            <MediaDetailsPage />
                        </AuthWrapper>
                    }
                />
                <Route
                    exact
                    path="/upload"
                    element={
                        <AuthWrapper>
                            <UploadMediaPage />
                        </AuthWrapper>
                    }
                />
                <Route
                    path="/user"
                    element={
                        <AuthWrapper>
                            <UserProfilePage />
                        </AuthWrapper>
                    }
                />

                {/* ADMIN PANEL  */}
                <Route
                    path="/admin"
                    // if user is ADMIN => ELSE navigate to main page
                    element={isAdmin ? <AdminPanelPage /> : <Navigate to="/" />}
                />
                <Route
                    path="/admin/edit/:id"
                    // if user is ADMIN => ELSE navigate to main page
                    element={isAdmin ? <AdminEditMediaPage /> : <Navigate to="/" />}
                />
            </Routes>
        </>
    );
}

export default App;
