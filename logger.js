const winston = require("winston");

const logger = winston.createLogger({
    level: "debug", // LOGGING LEVEL
    format: winston.format.combine(
        // winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        winston.format.printf(({ level, message }) => {
            return `\[${level.toUpperCase()}\]: ${message}`;
        })
    ),
    transports: [
        // To see everything in CONSOLE
        new winston.transports.Console(),

        //to export everything to the FILE
        // new winston.transports.File({ filename: "logs.txt" }),
    ],
});

module.exports = logger;
