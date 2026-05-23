const errorMiddleware = (
  err,
  req,
  res,
  next
) => {

  console.error("ERROR:");
  console.error(err);

  console.error("STACK:");
  console.error(err.stack);

  return res.status(
    err.statusCode || 500
  ).json({
    success: false,
    message:
      err.message ||
      "Internal Server Error",

    stack:
      process.env.NODE_ENV ===
      "development"
        ? err.stack
        : undefined,
  });
};

export default errorMiddleware;