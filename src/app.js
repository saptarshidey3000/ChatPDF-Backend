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
import requireAuth from "./middlewares/auth.middleware.js";

import securityMiddleware from "./middlewares/security.middleware.js";
import { globalLimiter } from "./middlewares/rateLimit.middleware.js";

const app = express();
app.set("trust proxy", 1);

// =============================
// Security Middleware
// =============================

securityMiddleware(app);

app.use(globalLimiter);


// =============================
// CORS
// =============================

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);


// =============================
// Core Middleware
// =============================

app.use(express.json());

app.use(cookieParser());

app.use(morgan("dev"));


// =============================
// Clerk Auth Middleware
// =============================

app.use(clerkMiddleware());


// =============================
// Health Check
// =============================

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Backend running",
  });
});


// =============================
// Test PostgreSQL Connection
// =============================

app.get("/test-db", async (req, res) => {

  await prisma.$queryRaw`SELECT 1`;

  res.json({
    success: true,
    message: "Database connected successfully",
  });

});


// =============================
// Test Error Middleware
// =============================

app.get(
  "/error-test",
  asyncHandler(async (req, res) => {

    throw new Error("Test error");

  })
);


// =============================
// Protected Route Test
// =============================

app.get(
  "/protected",
  requireAuth(),
  (req, res) => {

    res.json({
      success: true,
      userId: req.auth.userId,
    });

  }
);


// =============================
// Routes
// =============================

app.use("/api/test", testRoutes);

app.use("/api/v1/upload", uploadRoutes);

app.use("/api/v1/chat", chatRoutes);


// =============================
// Global Error Handler
// =============================

app.use(errorMiddleware);

export default app;