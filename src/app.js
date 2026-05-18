import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import prisma from "./config/db.js";
import errorMiddleware from "./middlewares/error.middleware.js";
import asyncHandler from "./utils/asyncHandler.js";

const app = express();

app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
}));

app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Backend running",
  });
});




app.get("/test-db", async (req, res) => {
  const data = await prisma.test.findMany();

  res.json({
    success: true,
    data,
  });
});

app.use(errorMiddleware);

app.get(
  "/error-test",
  asyncHandler(async (req, res) => {
    throw new Error("Test error");
  })
);

export default app;