const express = require("express");
const router = express.Router();
const userController = require("./controller");
const { createUserSchema, updateUserSchema } = require("./schema");
const { validateSchema } = require("../../common/utils");

router.get("/", userController.getAll);

router.get("/:id", userController.getById);

router.post("/", validateSchema(createUserSchema), userController.create);

router.put("/:id", validateSchema(updateUserSchema), userController.update);

router.delete("/:id", userController.remove);

module.exports = router;