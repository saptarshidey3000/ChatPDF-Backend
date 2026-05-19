const requireAuth = (req, res, next) => {
  const userId = req.auth?.userId;

  if (!userId) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }

  req.userId = userId;

  next();
};

export default requireAuth;