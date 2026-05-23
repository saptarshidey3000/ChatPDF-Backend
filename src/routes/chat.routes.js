import express from "express";

import requireAuth
from "../middlewares/auth.middleware.js";

import {askPdfQuestion} from "../controllers/chat.controller.js";
import {streamPdfAnswer} from "../controllers/stream.controller.js";
import {aiLimiter} from "../middlewares/rateLimit.middleware.js";

const router = express.Router();

/*
|--------------------------------------------------------------------------
| Ask Question About PDF
|--------------------------------------------------------------------------
*/

router.post(
  "/ask",
  requireAuth,
  aiLimiter, //rate limit RAG endpoint
  askPdfQuestion
);

//Stream PDF Answer
router.post(
  "/stream",
  requireAuth,
  aiLimiter, //rate limit streaming endpoint
  streamPdfAnswer
);

export default router;