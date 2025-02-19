import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import Loader from "./components/Loader";

// div animation
import { motion } from "framer-motion";

// get SERVER URL from .env
const serverURL = process.env.REACT_APP_SERVER_URL;

const MainPage = () => {
    // STATES for music sliders
    const [latestSongs, setLatestSongs] = useState([]);
    const [mixSongs, setMixSongs] = useState([]);

    // STATE for LOADER
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // create FUNCTION to PARSE DATA from SERVER
        const fetchData = async () => {
            try {
                // Retrieve the token from localStorage
                const token = localStorage.getItem("token");

                // Check if token exists
                if (!token) {
                    console.error("No token found, please log in");
                    return;
                }

                const response = await axios.get(`${serverURL}/`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                // ASSIGN received data to the VARIABLE
                let data = await response.data;

                // if DATA is NOT EMPTY
                if (data) {
                    setLatestSongs(data.byDate || []);
                    setMixSongs(data.byPlaylist || []);
                }
            } catch (error) {
                console.error("Error fetching main page data: \n", error);
                // return null;
                setIsLoading(false);
            } finally {
                // setIsLoading(false);
            }
        };

        // CALL THAT FUNCTION
        fetchData();
    }, []);

    document.title = `Kaizen • HOME`;

    return (
        <motion.div
            initial={{ y: "100vh" }}
            animate={{ y: 0 }}
            transition={{ type: "tween", duration: 0.2, ease: "easeOut" }}
        >
            {isLoading ? (
                <Loader />
            ) : (
                <div className="page-content">
                    <br />
                    <h2 className="category-title">Latest</h2>
                    <div className="slider-grid-container">
                        {latestSongs.map((media) => (
                            <Link key={media._id} className="grid-item" to={`/medias/${media._id}`}>
                                <img
                                    src={`${serverURL}/media/${media.coverUrl}`}
                                    alt="album_cover"
                                />
                                <div className="grid-item-description">
                                    <div className="grid-item-title">{media.name}</div>
                                    <div className="grid-item-author">{media.author}</div>
                                </div>
                            </Link>
                        ))}
                    </div>
                    <br />
                    <h2 className="category-title">Mix</h2>
                    <div className="slider-grid-container">
                        {mixSongs.map((media) => (
                            <Link key={media._id} className="grid-item" to={`/medias/${media._id}`}>
                                <img
                                    src={`${serverURL}/media/${media.coverUrl}`}
                                    alt="album_cover"
                                />
                                <div className="grid-item-description">
                                    <div className="grid-item-title">{media.name}</div>
                                    <div className="grid-item-author">{media.author}</div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </motion.div>
    );
};

export default MainPage;
