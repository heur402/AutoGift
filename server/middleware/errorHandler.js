const errorHandler = (error, req, res, next) => {
  let statusCode = error.statusCode || error.status || 500;
  let message = error.message || "Internal server error";

  if (error.name === "ValidationError") {
    statusCode = 400;
    message = Object.values(error.errors)
      .map((validationError) => validationError.message)
      .join(", ");
  } else if (error.name === "CastError") {
    statusCode = 400;
    message = `Invalid ${error.path}`;
  } else if (error.code === 11000) {
    statusCode = 409;
    message = `A record with that ${Object.keys(error.keyPattern || {})[0] || "value"} already exists`;
  }

  res.status(statusCode).json({ message });
};

export default errorHandler;
