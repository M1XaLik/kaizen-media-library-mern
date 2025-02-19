import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import Loader from "./components/Loader";

// to convert data
import moment from "moment";

// to animate divs
import { motion } from "framer-motion";

// get SERVER URL from .env
const serverURL = process.env.REACT_APP_SERVER_URL;

const MediaDetailsPage = () => {
    const { id } = useParams();
    const [media, setMedia] = useState(null);
    const [isLoading, setIsLoading] = useState(true); // State for loader

    useEffect(() => {
        const fetchMedia = async () => {
            const token = localStorage.getItem("token");

            try {
                const response = await axios.get(`${serverURL}/medias/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.status !== 200) {
                    throw new Error("Network response was not ok");
                }

                const data = await response.data;

                setMedia(data);
                setIsLoading(false); // Hide loader when data is loaded

                // SET DOCUMENT NAME
                document.title = `Kaizen • ${data.name} - ${data.author}`;
            } catch (error) {
                console.error("ERROR:", error);
                setIsLoading(false); // Ensure loader is hidden even in case of error
            }
        };

        fetchMedia();
    }, [id]);

    if (isLoading) {
        return <Loader />; // Show Loader before animation
    }

    if (!media) {
        return <div>NOT FOUND</div>;
    }

    const formattedDate = moment(media.date).format("DD.MM.YYYY");

    // RENDER COMPONENT
    return (
        <motion.div
            initial={{ y: "100vh" }}
            animate={{ y: 0 }}
            transition={{ type: "tween", duration: 0.2, ease: "easeOut" }}
        >
            <div className="page-content">
                <div className="media-container">
                    <video
                        controls
                        poster={`${serverURL}/media/${media.coverUrl}`}
                        className="view-media"
                    >
                        <source src={`${serverURL}/media/${media.mediaUrl}`} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>

                <br className="hide-when-phone-resolution" />

                <div className="media-page-about-section-container">
                    <div className="media-page-description">
                        <div className="media-description-flex-section">
                            <img
                                src={`${serverURL}/media/${media.coverUrl}`}
                                alt=""
                                className="media-page-album-cover"
                            />
                            <div>
                                <p>Title:</p>
                                <h2>{media.name}</h2>
                                <p>Author:</p>
                                <h2>{media.author}</h2>
                                <p>Release date:</p>
                                <h2>{formattedDate}</h2>
                            </div>
                        </div>
                        <br /> <p>About:</p> <p>{media.description}</p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default MediaDetailsPage;
