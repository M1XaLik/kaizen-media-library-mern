import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import Loader from "./components/Loader";

// div animation
import { motion } from "framer-motion";

// TO USE PUSH NOTIFICATIONS
import { toast } from "react-toastify";

// get SERVER URL from .env
const serverURL = process.env.REACT_APP_SERVER_URL;

// Retrieve the token from localStorage
const token = localStorage.getItem("token");

const AdminPanelPage = () => {
    const [mediaList, setMediaList] = useState([]);

    // STATE for LOADER
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // to GET ALL of the media to be approved
        const fetchApprovalMedia = async () => {
            try {
                const response = await axios.get(`${serverURL}/admin`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setMediaList(response.data); // Update state with fetched data
            } catch (error) {
                // console.log("Error fetching data:", error);
                setIsLoading(false);
            } finally {
                setIsLoading(false);
            }
        };

        fetchApprovalMedia();

        // DOCUMENT TITLE
        document.title = "Kaizen • Admin Panel";
    }, []);

    const approveMedia = async (id) => {
        try {
            // ПОЯСНИ
            await axios.patch(
                `${serverURL}/admin/approve/${id}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            // Update the mediaList state to remove the item with the given id
            setMediaList(mediaList.filter((media) => media._id !== id));

            toast.success("Approved!");
        } catch (error) {
            // console.log("error: ", error);
            toast.error("Something went wrong!");
        }
    };

    const deleteMedia = async (id) => {
        try {
            await axios.delete(`${serverURL}/admin/delete/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            toast.success("Deleted Successfully!");
        } catch (error) {
            console.log("error: ", error);

            toast.error("Something went wrong!");
        }
    };

    if (isLoading) {
        return <Loader />; // Show Loader before animation
    }

    // RENDER THE PAGE
    return (
        <motion.div
            initial={{ y: "100vh" }}
            animate={{ y: 0 }}
            transition={{ type: "tween", duration: 0.2, ease: "easeOut" }}
        >
            <div className="page-content">
                <h1 className="page-title-text">Awaiting Confirmation</h1>
                <div className="admin-panel-grid-container">
                    {mediaList.map((media) => (
                        <div className="admin-panel-grid-item" key={media._id}>
                            <img
                                src={`${serverURL}/media/${media.coverUrl}`}
                                alt="album_cover"
                                className="albumCover"
                            />
                            <div className="grid-item-title">{media.name}</div>
                            <div className="grid-item-author">{media.author}</div>
                            <div className="grid-item-description">{media.description}</div>

                            <div className="admin-buttons">
                                <Link className="edit-link" to={`/admin/edit/${media._id}`}>
                                    Edit
                                    {/* <i className="fa-solid fa-pen"></i> */}
                                </Link>

                                <button
                                    className="admin-approve-button"
                                    onClick={() => approveMedia(media._id)}
                                >
                                    Approve
                                    {/* <i className="fa-solid fa-check"></i> */}
                                </button>
                                <button
                                    className="admin-delete-button"
                                    onClick={() => deleteMedia(media._id)}
                                >
                                    Delete
                                    {/* <i className="fa-solid fa-xmark"></i> */}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

export default AdminPanelPage;
