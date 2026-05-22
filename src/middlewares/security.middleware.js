import helmet from "helmet";
import hpp from "hpp";
import compression from "compression";
import xss from "xss-clean";
import mongoSanitize from "express-mongo-sanitize";

//Security Middlewares
const securityMiddleware = (app) => {
    //Set security HTTP headers
    app.use(helmet());

    //Prevent HTTP Parameter Pollution
    app.use(hpp());
    //Compress responses
    app.use(compression());
    //Data sanitization against XSS  
    app.use(xss());
    //Data sanitization against NoSQL injection
    app.use(mongoSanitize());
};

export default securityMiddleware;