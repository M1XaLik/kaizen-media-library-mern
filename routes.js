require("dotenv").config();

const express = require("express");

// IMPORT MODELS
const Media = require("./models/mediaModel");
const User = require("./models/userModel");

// import LOGGER
const logger = require("./logger");

// CREATING ROUTER VARiable
const router = express.Router();

const bcrypt = require("bcryptjs"); // to HASH the PASSWORD
const jwt = require("jsonwebtoken"); // to USE TOKEN

// Middleware for token verification
const authMiddleware = async (req, res, next) => {
    // get the authorization header
    const authHeader = req.header("Authorization");

    // check if the authorization header is present
    if (!authHeader) {
        // logger.debug("no token provided");
        return res.status(401).send("Unauthorized: No token provided");
    }

    // remove the "bearer " prefix from the token
    const token = authHeader.replace("Bearer ", "");

    try {
        // verify the token using the secret key
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

        const user = await User.findById(decoded.userId);

        // Check if the user exists
        if (!user) {
            // logger.debug("user not found\n");
            return res.status(401).send("Access denied. User not found.");
        }

        // Attach the user object to the request object
        req.user = user;

        // proceed to the next middleware or route handler
        next();
    } catch (error) {
        // logger.debug("error:", error);

        // send a 401 unauthorized response if token verification fails
        res.status(401).send("Unauthorized: Invalid token");
    }
};

// Middleware to check if the USER is ADMIN or not
const verifyAdmin = (req, res, next) => {
    if (!req.user || !req.user.admin) {
        return res
            .status(403)
            .send("Forbidden: You do not have permission to access this resource");
    }
    next();
};

// ROUTES

// Route for registration
router.post("/register", async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10); // Hash the password
        const user = new User({ username, email, password: hashedPassword });
        await user.save(); // Save the user to the database
        res.send("User registered");
    } catch (error) {
        // console.log("ERROR:\n", error);
    }
});

// Route for login
router.post("/login", async (req, res) => {
    const { username, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ username });
    if (!user) {
        return res.send("User not found");
    }

    // Check if the password is correct
    const isPasswordValid = await bcrypt.compare(password, user.password); // Compare passwords
    if (!isPasswordValid) {
        return res.send("Invalid password");
    }

    // Create a token for the user
    const token = jwt.sign(
        {
            userId: user._id,
            admin: user.admin,
        },
        process.env.JWT_SECRET_KEY
        // {
        //     expiresIn: "1h",
        // }
    ); // Generate JWT token that EXPIRES in 1 HOUR

    res.send({ token }); // Send the token to the client
});

// Admin Panel Page
router.get("/admin", authMiddleware, verifyAdmin, async (req, res) => {
    try {
        // FIND DATA
        approvedMedia = await Media.find({ isApproved: false });

        // SEND DATA
        res.status(200).json(approvedMedia);
    } catch (error) {
        logger.debug("Error:", error);
    }
});

// Approve media
router.patch("/admin/approve/:id", authMiddleware, verifyAdmin, async (req, res) => {
    try {
        const { id } = req.params;

        const media = await Media.findById(id);

        if (!media) {
            return res.status(404).json({ error: "Media not found" });
        }

        media.isApproved = true;

        await media.save();

        res.status(200).json({ message: "Media approved successfully" });
    } catch (error) {
        logger.debug("error: ", error);
        res.status(500).json({ error: "Error approving media" });
    }
});

// Delete media
router.delete("/admin/delete/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const media = await Media.findById(id);

        if (!media) {
            return res.status(404).json({ error: "Media not found" });
        }

        await media.remove();
        res.status(200).json({ message: "Media deleted successfully" });

        logger.debug("Media deleted successfully");
    } catch (error) {
        res.status(500).json({ error: "Error deleting media" });

        logger.debug("Error deleting media: ", error);
    }
});

// Edit media
router.patch("/admin/edit/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        // parameter NEW means that function must return RENEWED object instead
        const media = await Media.findByIdAndUpdate(id, updates, { new: true });

        if (!media) {
            return res.status(404).json({ error: "Media not found" });
        }

        res.status(200).json(media);

        logger.debug("Media edited successfully");
    } catch (error) {
        res.status(500).json({ error: "Error updating media" });

        logger.debug("Error updating media: ", error);
    }
});

// Route for getting user info
router.get("/user", authMiddleware, async (req, res) => {
    const user = await User.findById(req.user._id).select("-password"); // Find user by ID and exclude password

    res.json({ user });

    // logger.debug(user);
});

// MAIN page
router.get("/", authMiddleware, async (req, res) => {
    try {
        // FIND & SORT data
        // IN REVERSE ORDER (date: -1)
        const byDate = await Media.find({ isApproved: true }).sort({ date: -1 }).limit(5);
        const byDateMediasObjects = byDate.map((media) => media.toObject());

        // ALPHABETIC (playlist: 1)
        const byPlaylist = await Media.find({ isApproved: true }).sort({ playlist: 1 }).limit(5);
        const byPlaylistMediaObjects = byPlaylist.map((media) => media.toObject());

        res.json({
            byDate: byDateMediasObjects,
            byPlaylist: byPlaylistMediaObjects,
        });

        // console.log("playlist: ", byPlaylistMediaObjects);
    } catch (error) {
        // console.error("ERROR:", error);
        logger.debug("ERROR:\n", error);
        res.status(500).json({ error: error.message });
    }
});

// LIBRARY page
router.get("/library", authMiddleware, async (req, res) => {
    try {
        // find({}) all the data in MONGODB
        const medias = await Media.find({ isApproved: true });
        const mediasObjects = medias.map((media) => media.toObject());

        // SEND DATA TO THE CLIENT
        res.json({
            medias: mediasObjects,
            // title: "LIBRARY",
        });
    } catch (error) {
        logger.debug("ERROR: ", error);
        res.status(500).json({ error: error.message });
    }
});

// ELEMENT page
router.get("/medias/:id", authMiddleware, async (req, res) => {
    try {
        // Extract the parameter 'id' from the URL request
        const mediaId = req.params.id;

        // Search for media in the database by the identifier
        const media = await Media.findById(mediaId);
        if (!media) {
            return res.json({ status: "404", error: "not found" });
        } else {
            // logger.debug("media: ", media);
        }

        // send to the FRONTEND
        res.status(200).json(media.toObject());
    } catch (error) {
        logger.debug("ERROR: ", error);
        res.status(500).json({ error: "INTERNAL SERVER ERROR OCCURED" });
    }
});

// TO SAVE DATA IN THE FOLDER
const multer = require("multer");

// MIDLEWARE TO RENAME && STORE FILES
const storage = multer.diskStorage({
    // WHERE TO STORE && NAME
    destination: function (req, file, cb) {
        cb(null, "data/medias"); // cb - callback
    },
    filename: function (req, file, cb) {
        // FILE NAME
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, file.fieldname + "-" + uniqueSuffix + "-" + file.originalname);
    },
});

// TO PASS FILES TO OUR MODEL
const singleUpload = multer({ storage: storage }).fields([
    { name: "media_cover" },
    { name: "media_file" },
]);

// TO WORK WITH DATA FORMATS
const moment = require("moment");

// POST METHOD FOR SUBMITTING MUSIC
// upload DATA from HTML FORM to the MONGO
// on the submit button click
router.post("/upload_media", singleUpload, authMiddleware, async (req, res) => {
    try {
        const { media_name, media_author, media_description, media_playlist, media_date } =
            req.body;
        const media_cover = req.files.media_cover[0].filename;
        const media_file = req.files.media_file[0].filename;

        // CONVERT DATE
        const formattedDate = moment(media_date).format("YYYY-MM-DD");

        // CREATE NEW DATA SCHEMA
        const newMedia = new Media({
            name: media_name,
            description: media_description,
            author: media_author,
            mediaUrl: media_file,
            coverUrl: media_cover,
            date: formattedDate,
            playlist: media_playlist,
            isApproved: false, // to upload media it must be approved by admin
        });

        // SAVE DATA TO DATABASE
        await newMedia.save();

        // SEND JSON
        res.json({ status: "success", message: "Successfully added to database" });
    } catch (error) {
        logger.debug("An error occurred while adding an element:", error);

        // SEND JSON
        res.json({ status: "error", message: "An error occurred while adding an element" });
    }
});

module.exports = router;
