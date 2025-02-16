require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose"); // DATABASE module
const os = require("os");

// to be able to COLOUR the CONSOLE lines
const chalk = require("chalk");

// ROUTES
const router = require("./routes");

// LIBRARY to OPERATE on PATHS
const path = require("path");

// SERVER PORT from .env OR set default port as 5000
const PORT = process.env.PORT || 5000;

// PROGRAM OBJECT
const app = express();
// Enable CORS (Cross-Origin Resource Sharing) for all routes
app.use(cors());

// This makes it possible to work with JSON data in the request body
app.use(express.json());

// middleware to allow Cross-Origin Resource Sharing fetch (CORS)
app.use((req, res, next) => {
    res.setHeader(
        "Access-Control-Allow-Origin",
        `${process.env.CLIENT_IP}:${process.env.CLIENT_PORT}`
    ); // Access to domain resources
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS"); // methods
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, Origin, Accept"); // specifying the request type and headers
    res.setHeader("Access-Control-Allow-Credentials", "true"); // can requests transmit cookies, etc
    next();
});

// CLIENT can ACCESS file in the specific directory
app.use("/media", express.static(path.join(__dirname, "data/medias")));

//USE DATA FROM HTML FORM
app.use(express.urlencoded({ extended: true }));

// REPLACE the default routes with our ROUTER
app.use("/", router);

// import LOGGER
const logger = require("./logger");

// Function to get the local IP address
const getLocalIPAddress = () => {
    // Get information about all network interfaces
    const interfaces = os.networkInterfaces();

    // Iterate over all network interfaces
    for (const interfaceName in interfaces) {
        // Iterate over each configuration of the interface
        for (const iface of interfaces[interfaceName]) {
            // Check if it is an IPv4 address and not an internal (local) address
            if (iface.family === "IPv4" && !iface.internal) {
                // Return the IP address if conditions are met
                return iface.address;
            }
        }
    }
    // Return 'localhost' if no conditions are met
    return "localhost";
};

// START the SERVER
async function start() {
    try {
        // TRY to CONNECT to the DATABASE
        await mongoose
            .connect(process.env.DATABASE_URL)
            .then(() => {
                console.log(chalk.green.bold("CONNECTED TO THE MONGO DATABASE"));
            })
            .catch((error) => {
                console.log("ERROR:", error);
            });

        // TO START THE SERVER
        app.listen(PORT, () => {
            const server_ip = getLocalIPAddress();
            console.log(
                chalk.cyanBright(`\nServer running on:\n`) +
                    chalk.cyanBright(`http://${server_ip}:${PORT}\n`)
            );
            logger.debug("logger is working");
        });
    } catch (error) {
        console.log("ERROR: \n", error);
    }
}

start();
