import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import Loader from "./components/Loader"; // Import loader component

// get SERVER URL from .env
const serverURL = process.env.REACT_APP_SERVER_URL;

const LibraryPage = ({ isAdmin }) => {
    const [medias, setMediaData] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [isLoading, setIsLoading] = useState(true); // State for loader

    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");

        const fetchData = async () => {
            try {
                const response = await axios.get(`${serverURL}/library`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setMediaData(response.data.medias);
            } catch (error) {
                console.error("Error fetching library data:", error);
            } finally {
                setIsLoading(false); // Hide loader when data is loaded
            }
        };

        fetchData();

        // DOCUMENT TITLE
        document.title = "Kaizen • LIBRARY";
    }, []);

    // TO HANDLE SEARCH
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value.toLowerCase());
    };

    // DELETE BUTTON
    const handleDelete = async (id) => {
        if (!window.confirm("Ви впевнені, що хочете видалити цей медіафайл?")) return;

        const token = localStorage.getItem("token");
        try {
            await axios.delete(`${serverURL}/admin/delete/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            // Remove the media object with the matching id from the state
            setMediaData((prevMedias) => prevMedias.filter((media) => media._id !== id));

            // Redirect to the home page after deletion
            navigate("/");
        } catch (error) {
            console.error("Error deleting media:", error);
            alert("Не вдалося видалити медіафайл.");
        }
    };

    const filteredMedias = medias.filter(
        (media) =>
            media.name.toLowerCase().includes(searchTerm) ||
            media.author.toLowerCase().includes(searchTerm)
    );

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
                <h1 className="library-page-title-text">LIBRARY</h1>
                <br />
                <div className="search-container">
                    <div className="search-box-wrapper">
                        <i className="fas fa-search search-icon"></i>
                        <input
                            type="text"
                            id="search"
                            className="search-box"
                            placeholder="Що ви хочете знайти?"
                            value={searchTerm}
                            onChange={handleSearchChange}
                        />
                    </div>
                </div>

                <br />

                <div className="grid-container">
                    {filteredMedias.length ? (
                        filteredMedias.map((media) => (
                            <Link
                                key={media._id}
                                className="library-grid-item"
                                to={`/medias/${media._id}`}
                            >
                                <div className="library-grid-item-info-container">
                                    <img
                                        src={`${serverURL}/media/${media.coverUrl}`}
                                        alt="album_cover"
                                        className="albumCover"
                                    />
                                    <div className="library-grid-item-description">
                                        <div className="grid-item-title">{media.name}</div>
                                        <div className="grid-item-author">{media.author}</div>
                                    </div>
                                </div>

                                {isAdmin && (
                                    <button
                                        className="delete-element-library-page"
                                        onClick={() => handleDelete(media._id)}
                                    >
                                        <i
                                            className="fa-solid fa-trash fa-1x"
                                            style={{ color: "white" }}
                                        ></i>
                                    </button>
                                )}
                            </Link>
                        ))
                    ) : (
                        <div className="centered-container">
                            <div className="library-page-search-status">
                                Nothing found. Maybe it's time for coffee? 😊
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
    );
};

export default LibraryPage;
