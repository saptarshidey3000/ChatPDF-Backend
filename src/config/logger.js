import winston from "winston";

//winston logger configuration
const logger = winston.createLogger({
    level: "info",
    format: winston.format.json(),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({filename: "logs/error.log", level: "error"}),
    ],
});

export default logger;