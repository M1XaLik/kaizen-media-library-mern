import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import Loader from "./components/Loader"; // Import loader component

// get SERVER URL from .env
const serverURL = process.env.REACT_APP_SERVER_URL;

const LibraryPage = () => {
    const [medias, setMediaData] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [isLoading, setIsLoading] = useState(true); // State for loader

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
                    <i className="fas fa-search"></i>
                    <input
                        type="text"
                        id="search"
                        className="search-box"
                        placeholder="Що ви хочете знайти?"
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
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
                                <img
                                    src={`${serverURL}/media/${media.coverUrl}`}
                                    alt="album_cover"
                                    className="albumCover"
                                />
                                <div className="library-grid-item-description">
                                    <div className="grid-item-title">{media.name}</div>
                                    <div className="grid-item-author">{media.author}</div>
                                </div>
                            </Link>
                        ))
                    ) : (
                        <div className="library-page-search-status">No results found</div>
                    )}
                </div>
            </div>
        </motion.div>
    );
};

export default LibraryPage;
