import express from "express";

// import requireAuth
// from "../middlewares/auth.middleware.js";

import {askPdfQuestion} from "../controllers/chat.controller.js";

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

export default router;