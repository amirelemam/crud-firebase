const path = require("path");
const {
  updateData,
  pushData,
  readDataOnce,
  deleteData
} = require(path.resolve(__dirname, "../../db/firebase-service"));
const { getLocationByZipCode } = require("../../common/location-service");
const { NotFoundError } = require("../../common/errors");
const { throwError, formatTimezone } = require("../../common/utils");

const create = async ({ name, zipCode }) => {
  try {
    // get location by zip code
    const location = await getLocationByZipCode(zipCode);

    const newUser = {
      name,
      zipCode,
      ...location,
    };

    const newUserRef = await pushData("users", newUser);

    // Format timezone if it exists
    if (newUserRef.timezone !== undefined) {
      newUserRef.timezone = formatTimezone(newUserRef.timezone);
    }

    return newUserRef;
  } catch (error) {
    throwError(error, "Failed to create user");
  }
}

const update = async (id, updateFields) => {
  try {
    const existingUser = await readDataOnce(`users/${id}`);
    if (!existingUser) {
      throw new NotFoundError(`User with id ${id} not found`);
    }

    let data = { ...updateFields };

    // If zipCode is being updated and it's different from the current one, get new location
    if (updateFields.zipCode && updateFields.zipCode !== existingUser.zipCode) {
      const location = await getLocationByZipCode(updateFields.zipCode);
      data = { ...data, ...location };
    }

    const updatedUser = await updateData(`users/${id}`, data);

    // Format timezone if it exists
    if (updatedUser.timezone !== undefined) {
      updatedUser.timezone = formatTimezone(updatedUser.timezone);
    }

    return updatedUser;
  } catch (error) {
    throwError(error, "Failed to update user");
  }
}

const remove = async (id) => {
  try {
    // Check if user exists
    const existingUser = await readDataOnce(`users/${id}`);
    if (!existingUser) {
      throw new NotFoundError(`User with id ${id} not found`);
    }

    await deleteData(`users/${id}`);
  } catch (error) {
    throwError(error, "Failed to delete user");
  }
}

const getById = async ({ id }) => {
  try {
    const user = await readDataOnce(`users/${id}`);

    if (!user) {
      throw new NotFoundError(`User with id ${id} not found`);
    }

    // Format timezone if it exists
    if (user.timezone !== undefined) {
      user.timezone = formatTimezone(user.timezone);
    }

    return user;
  } catch (error) {
    throwError(error, "Failed to get user");
  }
}

const getAll = async () => {
  try {
    const users = await readDataOnce("users");

    if (users) {
      return Object.keys(users).map(key => {
        const user = {
          id: key,
          ...users[key]
        };

        // Format timezone if it exists
        if (user.timezone !== undefined) {
          user.timezone = formatTimezone(user.timezone);
        }

        return user;
      });
    }

    return [];
  } catch (error) {
    throwError(error, "Failed to get users");
  }
}

module.exports = { create, update, remove, getById, getAll };