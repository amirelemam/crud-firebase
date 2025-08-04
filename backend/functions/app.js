const express = require("express");
const helmet = require("helmet");
const routes = require("./routes");
const { logger } = require("./middleware/logger");
const { corsMiddleware } = require("./middleware/cors");
require("./db");

const app = express();

app.use(corsMiddleware);
app.use(helmet());
app.use(express.json());
app.use(logger);

app.use("/", routes);

// Non-existent routes
app.use("*", (req, res) => {
  res.status(404).json({
    status: "error",
    message: `Route ${req.originalUrl} not found`
  });
});

// Error handling
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error(err);

  // Handle our custom errors
  if (err.isOperational) {
    return res.status(err.statusCode).json({
      status: "error",
      message: err.message
    });
  }

  // Handle validation errors
  if (err.name === "UnprocessableEntityError" || err.statusCode === 422) {
    return res.status(422).json({
      status: "error",
      message: err.message || "Validation failed"
    });
  }

  // Default error response
  return res.status(500).json({
    status: "error",
    message: "Internal server error"
  });
});

module.exports = app;
