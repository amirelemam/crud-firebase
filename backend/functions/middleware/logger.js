const logger = (req, res, next) => {
  const start = Date.now();

  res.on("finish", () => {
    const duration = Date.now() - start;
    console.log(`${req.method} ${req.originalUrl} ${res.statusCode} ${duration}ms`);
  });

  next();
};

const errorLogger = (err, req, res, next) => {
  console.error(`Error: ${err.message}`);
  console.error(`Stack: ${err.stack}`);
  next(err);
};

module.exports = { logger, errorLogger };