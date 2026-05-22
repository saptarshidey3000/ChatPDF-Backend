import rateLimit from "express-rate-limit";

//global API Limiter

export const globalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, //15 minutes
    max: 100, //limit each IP to 100 requests per windowMs
    message:{
        success: false,
        message: "Too many requests from this IP, please try again after 15 minutes",
    }
});

//Ai Route Limiter

export const aiLimiter = rateLimit({
    windowMs: 60 *  1000, 
    max: 10, //limit each IP to 20 requests per windowMs
    message:{
        success: false,
        message: "Too many requests to AI endpoints, please try again after a minute",
    }
});