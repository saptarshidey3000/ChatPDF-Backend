import helmet from "helmet";
import hpp from "hpp";
import compression from "compression";

// Security Middlewares
const securityMiddleware = (app) => {

  // Secure HTTP headers
  app.use(helmet());

  // Prevent HTTP Parameter Pollution
  app.use(hpp());

  // Compress responses
  app.use(compression());

};

export default securityMiddleware;