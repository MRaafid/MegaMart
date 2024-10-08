const ErrorHandler = require("../utils/errorHandler");

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;

  if (process.env.NODE_ENV === "DEVELOPMENT") {
    res.status(err.statusCode).json({
      success: false,
      error: err,
      errorMessage: err.message,
      stack: err.stack,
    });
  }
  if (process.env.NODE_ENV === "PRODUCTION") {
    let error = { ...err };

    error.message = err.message;

    // Wrong Mangoose object ID Error
    if (err.name === "CastError") {
      const message = `Resource Not Found. Invalid ${err.path}`;
      error = new ErrorHandler(message, 400);
    }

    // Handlling Mangoose validation error
    if (err.name === "ValidationError") {
      const message = Object.values(err.errors).map((val) => val.message);
      error = new ErrorHandler(message, 400);
    }

    // Handlling Mangoose dublicate key error
    if (err.code === 11000) {
      const message = `The Mentioned ${Object.keys(
        err.keyValue
      )} already exists`;
      error = new ErrorHandler(message, 400);
    }

    // Handling wrong jwt error
    if (err.name === "JsonWebTokenError") {
      const message = "JASON Web Token is Invalid! Try Again!!!";
      error = new ErrorHandler(message, 400);
    }

    // Handling expired jwt error
    if (err.name === "TokenExpiredError") {
      const message = "JASON Web Token has Expired! Try Again!!!";
      error = new ErrorHandler(message, 400);
    }

    res.status(error.statusCode).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};
