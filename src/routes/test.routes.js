import express from "express";

import requireAuth from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get(
  "/protected",
  requireAuth,
  (req, res) => {
    res.json({
      success: true,
      userId: req.userId,
    });
  }
);

export default router;