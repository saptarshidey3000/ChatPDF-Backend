import { Router } from "express";

import { uploadPdf } from "../controllers/upload.controller.js";

import authMiddleware from "../middlewares/auth.middleware.js";

import { upload } from "../middlewares/upload.middleware.js";

const router = Router();

router.post(
  "/pdf",
  authMiddleware,
  upload.single("pdf"),
  uploadPdf
);

export default router;