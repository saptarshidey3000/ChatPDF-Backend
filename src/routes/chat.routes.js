import express from "express";

// import requireAuth
// from "../middlewares/auth.middleware.js";

import {askPdfQuestion} from "../controllers/chat.controller.js";
import {streamPdfAnswer} from "../controllers/stream.controller.js";

const router = express.Router();

/*
|--------------------------------------------------------------------------
| Ask Question About PDF
|--------------------------------------------------------------------------
*/

router.post(
  "/ask",
//   requireAuth,
  askPdfQuestion
);

//Stream PDF Answer
router.post(
  "/stream",
  streamPdfAnswer
);

export default router;