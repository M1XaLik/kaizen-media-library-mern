import React, { useState, useEffect } from "react";
import axios from "axios";

import Loader from "./components/Loader";

// TO USE NAVIGATION
import { useNavigate } from "react-router-dom";

// TO USE PUSH NOTIFICATIONS
import { toast } from "react-toastify";

import { motion } from "framer-motion";

// SERVER URL TO CONNECT TO
const serverUrl = process.env.REACT_APP_SERVER_URL;

// get TOKEN from the DATABASE
const token = localStorage.getItem("token");

const UploadMediaPage = () => {
    document.title = `Kaizen • UPLOAD`;

    // STATE for LOADER
    const [isLoading, setIsLoading] = useState(true);

    const [formData, setFormData] = useState({
        media_name: "",
        media_author: "",
        media_description: "",
        media_playlist: "",
        media_date: "",
        media_file: null,
        media_cover: null,
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value, files } = e.target; // Destructure name, value, and files from the event target
        setFormData((prevData) => ({
            ...prevData, // Spread previous state values
            [name]: files ? files[0] : value, // Update formData: use the file if files exist, otherwise use the input value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // to stop page refreshing
        const formDataToSend = new FormData(); // Create a new FormData object for collecting form data
        Object.entries(formData).forEach(([key, value]) => {
            formDataToSend.append(key, value); // Append each key-value pair to the FormData object
        });

        try {
            const response = await axios.post(`${serverUrl}/upload_media`, formDataToSend, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            });

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            // Redirect to main page in 2 seconds
            setTimeout(() => {
                navigate("/");
            }, 2000);

            toast.success("Upload Successful!");
        } catch (error) {
            // console.error("Error submitting media:", error);
            toast.error("Error submitting media");
            navigate("/");
        }
    };

    useEffect(() => {
        setIsLoading(false);
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
            {/* <h1 className="page-title-text">Upload</h1> */}
            <br className="hide-when-phone-resolution" />
            <div className="page-content">
                <div className="">
                    {/* UPLOAD FORM */}
                    <form
                        onSubmit={handleSubmit}
                        encType="multipart/form-data"
                        id="form_create_new"
                        className="form-background"
                    >
                        <label htmlFor="name">Name:</label>
                        <br />
                        <input
                            type="text"
                            id="media_name"
                            name="media_name"
                            required
                            className="form-text-field"
                            autoComplete="off"
                            onChange={handleChange}
                        />
                        <br />
                        <br />

                        <label htmlFor="author">Author:</label>
                        <br />
                        <input
                            type="text"
                            id="media_author"
                            name="media_author"
                            required
                            className="form-text-field"
                            autoComplete="off"
                            onChange={handleChange}
                        />
                        <br />
                        <br />

                        <label htmlFor="description">Description:</label>
                        <br />
                        <textarea
                            id="media_description"
                            name="media_description"
                            rows="4"
                            cols="50"
                            className="form-text-field"
                            onChange={handleChange}
                        ></textarea>
                        <br />
                        <br />

                        <div className="file-input-wrapper">
                            <label htmlFor="coverUrl">Upload Cover:</label>
                            <br />
                            <br />
                            <input
                                type="file"
                                id="media_cover"
                                name="media_cover"
                                required
                                className="file-input"
                                onChange={handleChange}
                            />
                            <br />
                            <br />
                        </div>

                        <div className="file-input-wrapper">
                            <label htmlFor="mediaUrl">Upload Song:</label>
                            <br />
                            <br />
                            <input
                                type="file"
                                id="media_file"
                                name="media_file"
                                required
                                className="file-input"
                                onChange={handleChange}
                            />
                            <br />
                            <br />
                        </div>

                        <label htmlFor="date">Date:</label>
                        <br />
                        <input
                            type="date"
                            id="media_date"
                            name="media_date"
                            required
                            className="form-text-field"
                            onChange={handleChange}
                        />
                        <br />
                        <br />

                        <label htmlFor="playlist">Playlist:</label>
                        <br />
                        <select
                            id="media_playlist"
                            name="media_playlist"
                            className="form-text-field"
                            onChange={handleChange}
                        >
                            <option value="">None</option>
                            <option value="popular">Popular</option>
                            <option value="old_style">Old Style</option>
                        </select>
                        <br />
                        <br />

                        <input type="submit" value="UPLOAD" className="submit-button" />
                    </form>
                </div>
            </div>
        </motion.div>
    );
};

export default UploadMediaPage;
