const { AppError, BadRequestError } = require("./errors");

const validateSchema = (schema) =>
  async (req, res, next) => {
    try {
      await schema.parseAsync({
        body: req.body,
        params: req.params,
        query: req.query,
      });
      next();
    } catch (error) {
      const errorMessage = error.errors ? error.errors.map(err => err.message).join(", ") : "Validation failed";
      const validationError = new BadRequestError(errorMessage);
      next(validationError);
    }
  };

const throwError = (error, message = "Internal server error", statusCode = 500) => {
  if (error instanceof Error) {
    throw error;
  }
  console.error(message, error);
  throw new AppError(message, statusCode);
}

const formatTimezone = (timezoneSeconds) => {
  if (timezoneSeconds === undefined || timezoneSeconds === null) {
    return null;
  }

  const hours = Math.floor(timezoneSeconds / 3600);
  const minutes = Math.abs(Math.floor((timezoneSeconds % 3600) / 60));

  const sign = hours >= 0 ? "+" : "-";
  const absHours = Math.abs(hours);

  if (minutes === 0) {
    return `UTC${sign}${absHours}:00`;
  } else {
    return `UTC${sign}${absHours}:${minutes.toString().padStart(2, "0")}`;
  }
};

module.exports = { validateSchema, throwError, formatTimezone };