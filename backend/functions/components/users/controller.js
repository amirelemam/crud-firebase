const userService = require("./service");
const { BadRequestError } = require("../../common/errors");

const create = async (req, res, next) => {
  try {
    const { name, zipCode } = req.body;

    const newUser = await userService.create({ name, zipCode });

    return res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
}

const update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, zipCode } = req.body;

    if (!name && !zipCode) {
      throw new BadRequestError("At least one field (name or zipCode) must be provided");
    }

    const updateData = {};
    if (name !== undefined) updateData.name = name;
    if (zipCode !== undefined) updateData.zipCode = zipCode;

    const updatedUser = await userService.update(id, updateData);

    return res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
}

const remove = async (req, res, next) => {
  try {
    const { id } = req.params;

    await userService.remove(id);

    return res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    next(error);
  }
}

const getById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await userService.getById({ id });

    return res.status(200).json(user);
  } catch (error) {
    next(error);
  }
}

const getAll = async (req, res, next) => {
  try {
    console.log("getAll");
    const users = await userService.getAll();

    console.log("users", users);

    return res.status(200).json(users);
  } catch (error) {
    next(error);
  }
}

module.exports = { create, update, remove, getById, getAll };