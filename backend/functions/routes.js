const express = require("express");
const router = express.Router();
const usersRoutes = require("./components/users/routes");

router.get("/", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Welcome to the API"
  });
});

router.use("/users", usersRoutes);

module.exports = router;