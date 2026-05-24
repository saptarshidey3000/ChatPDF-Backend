import express from "express";

import requireAuth
from "../middlewares/auth.middleware.js";

import {askPdfQuestion} from "../controllers/chat.controller.js";
import {streamPdfAnswer} from "../controllers/stream.controller.js";
import {aiLimiter} from "../middlewares/rateLimit.middleware.js";
import { getChatsByPdfId } from "../controllers/chat.controller.js";

const router = express.Router();

/*
|--------------------------------------------------------------------------
| Ask Question About PDF
|--------------------------------------------------------------------------
*/

router.get(
  "/:pdfId",
  requireAuth,
  getChatsByPdfId
);

router.post(
  "/ask",
  requireAuth,
  aiLimiter,
  askPdfQuestion
);

router.post(
  "/stream",
  requireAuth,
  aiLimiter,
  streamPdfAnswer
);

export default router;