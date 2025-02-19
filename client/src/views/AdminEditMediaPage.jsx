import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

import Loader from "./components/Loader";

// div animation
import { motion } from "framer-motion";

// get SERVER URL from .env
const serverURL = process.env.REACT_APP_SERVER_URL;

// Retrieve the token from localStorage
const token = localStorage.getItem("token");

const AdminEditMediaPage = () => {
    const { id } = useParams(); // Отримуємо ідентифікатор медіа з URL
    const [media, setMedia] = useState({
        name: "",
        description: "",
        author: "",
        mediaUrl: "",
        coverUrl: "",
        date: "",
        playlist: "",
    });

    // STATE for LOADER
    const [isLoading, setIsLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        // Check if token exists
        if (!token) {
            console.error("No token found, please log in");
            return;
        }

        // Fetch the specific media DATA to edit
        const fetchMedia = async () => {
            try {
                const response = await axios.get(`${serverURL}/medias/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setMedia(response.data);
            } catch (error) {
                // console.log("Error fetching media:", error);
                setIsLoading(false);
            } finally {
                setIsLoading(false);
            }
        };

        fetchMedia();

        // DOCUMENT TITLE
        document.title = "Kaizen • Admin Panel";
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setMedia({ ...media, [name]: value });
    };

    const handleSave = async () => {
        try {
            await axios.patch(`${serverURL}/admin/edit/${id}`, media, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            navigate("/admin"); // Перенаправляємо назад до адмін панелі
        } catch (error) {
            console.log("Error saving media:", error);
        }
    };

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
                <h1 className="page-title-text">Edit</h1>
                <div className="edit-media-page-container">
                    <form>
                        <label>Name:</label>
                        <input type="text" name="name" value={media.name} onChange={handleChange} />
                        <label>Description:</label>
                        <input
                            type="text"
                            name="description"
                            value={media.description}
                            onChange={handleChange}
                        />
                        <label>Author:</label>
                        <input
                            type="text"
                            name="author"
                            value={media.author}
                            onChange={handleChange}
                        />

                        {/* <label>Date:</label>
                    <input type="date" name="date" value={media.date} onChange={handleChange} /> */}
                        {/* <label>Playlist:</label>
                <input type="text" name="playlist" value={media.playlist} onChange={handleChange} /> */}
                        {/* <label>Media URL:</label>
                <input type="text" name="mediaUrl" value={media.mediaUrl} onChange={handleChange} />
                <label>Cover URL:</label>
                <input type="text" name="coverUrl" value={media.coverUrl} onChange={handleChange} /> */}
                        <button type="button" onClick={handleSave}>
                            Save
                        </button>
                    </form>
                </div>
            </div>
        </motion.div>
    );
};

export default AdminEditMediaPage;
