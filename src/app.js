import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";

import prisma from "./config/db.js";

import errorMiddleware from "./middlewares/error.middleware.js";
import asyncHandler from "./utils/asyncHandler.js";

import { clerkMiddleware } from "@clerk/express";
import testRoutes from "./routes/test.routes.js";
import uploadRoutes from "./routes/upload.routes.js";
import chatRoutes from "./routes/chat.routes.js";

const app = express();


// Allow frontend requests
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);


// Parse JSON request body
app.use(express.json());


// Read cookies from requests
app.use(cookieParser());


// Log API requests in terminal
app.use(morgan("dev"));


// Add Clerk auth info to req.auth
app.use(clerkMiddleware());


// Health check route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Backend running",
  });
});




// Test PostgreSQL connection
app.get("/test-db", async (req, res) => {
  const data = await prisma.test.findMany();

  res.json({
    success: true,
    data,
  });  
});


// Test global error handling
app.get(
  "/error-test",
  asyncHandler(async (req, res) => {
    throw new Error("Test error");
  })
);


// Check Clerk auth data
app.get("/protected", (req, res) => {
  res.json({
    success: true,
    authExists: !!req.auth,
    auth: req.auth,
    userId: req.auth?.userId || null,
  });
});

app.use("/api/test", testRoutes);

 //upload routes
app.use("/api/v1/upload", uploadRoutes);

//chat routes
app.use("/api/v1/chat", chatRoutes);

// Handle all application errors
app.use(errorMiddleware);

export default app;