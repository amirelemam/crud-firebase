const request = require("supertest");
const app = require("../../../app");
const userService = require("../service");
const { AppError } = require("../../../common/errors");

jest.mock("../service");

describe("User Routes", () => {
  describe("GET /users", () => {
    it("should return a list of users", async () => {
      const mockUsers = {
        user1: {
          name: "John Doe",
          zipCode: "12345",
          lat: 40.7128,
          lon: -74.0060,
          timezone: -18000
        },
        user2: {
          name: "Jane Doe",
          zipCode: "54321",
          lat: 34.0522,
          lon: -118.2437,
          timezone: -28800
        },
      };
      userService.getAll.mockResolvedValue(mockUsers);

      const res = await request(app).get("/users");

      expect(res.statusCode).toEqual(200);
      expect(res.body).toEqual(mockUsers);
      expect(userService.getAll).toHaveBeenCalledTimes(1);
    });

    it("should return an empty object if no users exist", async () => {
      userService.getAll.mockResolvedValue({});

      const res = await request(app).get("/users");

      expect(res.statusCode).toEqual(200);
      expect(res.body).toEqual({});
    });

    it("should handle errors gracefully", async () => {
      const errorMessage = "Failed to get users";

      userService.getAll.mockImplementation(() => {
        throw new AppError(errorMessage, 500);
      });

      const res = await request(app).get("/users");

      expect(res.statusCode).toEqual(500);
      expect(res.body).toEqual({
        status: "error",
        message: "Failed to get users",
      });
    });
  });

  describe("GET /users/:userId", () => {
    it("should return a specific user by ID", async () => {
      const mockUser = {
        name: "John Doe",
        zipCode: "12345",
        lat: 40.7128,
        lon: -74.0060,
        timezone: -18000
      };
      userService.getById.mockResolvedValue(mockUser);

      const res = await request(app).get("/users/user1");

      expect(res.statusCode).toEqual(200);
      expect(res.body).toEqual(mockUser);
      expect(userService.getById).toHaveBeenCalledWith({ id: "user1" });
    });

    it("should return 404 when user is not found", async () => {
      const { NotFoundError } = require("../../../common/errors");
      userService.getById.mockRejectedValue(new NotFoundError("User with id user999 not found"));

      const res = await request(app).get("/users/user999");

      expect(res.statusCode).toEqual(404);
      expect(res.body).toEqual({
        status: "error",
        message: "User with id user999 not found",
      });
    });

    it("should handle errors gracefully", async () => {
      const errorMessage = "Failed to get user";

      userService.getById.mockRejectedValue(new AppError(errorMessage, 500));

      const res = await request(app).get("/users/user1");

      expect(res.statusCode).toEqual(500);
      expect(res.body).toEqual({
        status: "error",
        message: "Failed to get user",
      });
    });
  });

  describe("POST /users", () => {
    it("should create a new user", async () => {
      const newUserData = {
        name: "Alice Smith",
        zipCode: "10001"
      };
      const mockCreatedUser = {
        id: "user3",
        name: "Alice Smith",
        zipCode: "10001",
        lat: 40.7505,
        lon: -73.9934,
        timezone: -18000
      };
      userService.create.mockResolvedValue(mockCreatedUser);

      const res = await request(app)
        .post("/users")
        .send(newUserData);

      expect(res.statusCode).toEqual(201);
      expect(res.body).toEqual(mockCreatedUser);
      expect(userService.create).toHaveBeenCalledWith(newUserData);
    });

    it("should return 422 for invalid request body - missing zipCode", async () => {
      const invalidData = {
        name: "Alice Smith"
      };

      const res = await request(app)
        .post("/users")
        .send(invalidData);

      expect(res.statusCode).toEqual(422);
    });

    it("should return 422 for invalid request body - missing name", async () => {
      const invalidData = {
        zipCode: "10001"
      };

      const res = await request(app)
        .post("/users")
        .send(invalidData);

      expect(res.statusCode).toEqual(422);
    });


    it("should handle creation errors gracefully", async () => {
      const newUserData = {
        name: "Alice Smith",
        zipCode: "10001"
      };
      const errorMessage = "Failed to create user";

      userService.create.mockRejectedValue(new AppError(errorMessage, 500));

      const res = await request(app)
        .post("/users")
        .send(newUserData);

      expect(res.statusCode).toEqual(500);
      expect(res.body).toEqual({
        status: "error",
        message: "Failed to create user",
      });
    });
  });

  describe("PUT /users/:userId", () => {
    it("should update an existing user", async () => {
      const updateData = {
        name: "John Updated",
        zipCode: "20001"
      };
      const mockUpdatedUser = {
        name: "John Updated",
        zipCode: "20001",
        lat: 38.9072,
        lon: -77.0369,
        timezone: -18000
      };
      userService.update.mockResolvedValue(mockUpdatedUser);

      const res = await request(app)
        .put("/users/user1")
        .send(updateData);

      expect(res.statusCode).toEqual(200);
      expect(res.body).toEqual(mockUpdatedUser);
      expect(userService.update).toHaveBeenCalledWith("user1", updateData);
    });

    it("should update only name when only name is provided", async () => {
      const updateData = {
        name: "John Updated"
      };
      const mockUpdatedUser = {
        name: "John Updated",
        zipCode: "12345",
        lat: 40.7128,
        lon: -74.0060,
        timezone: -18000
      };
      userService.update.mockResolvedValue(mockUpdatedUser);

      const res = await request(app)
        .put("/users/user1")
        .send(updateData);

      expect(res.statusCode).toEqual(200);
      expect(res.body).toEqual(mockUpdatedUser);
      expect(userService.update).toHaveBeenCalledWith("user1", updateData);
    });

    it("should update only zipCode when only zipCode is provided", async () => {
      const updateData = {
        zipCode: "20001"
      };
      const mockUpdatedUser = {
        name: "John Doe",
        zipCode: "20001",
        lat: 38.9072,
        lon: -77.0369,
        timezone: -18000
      };
      userService.update.mockResolvedValue(mockUpdatedUser);

      const res = await request(app)
        .put("/users/user1")
        .send(updateData);

      expect(res.statusCode).toEqual(200);
      expect(res.body).toEqual(mockUpdatedUser);
      expect(userService.update).toHaveBeenCalledWith("user1", updateData);
    });

    it("should return 400 when no update fields are provided", async () => {
      const updateData = {};

      const res = await request(app)
        .put("/users/user1")
        .send(updateData);

      expect(res.statusCode).toEqual(400);
      expect(res.body).toEqual({
        status: "error",
        message: "At least one field (name or zipCode) must be provided",
      });
    });

    it("should return 404 when user is not found", async () => {
      const { NotFoundError } = require("../../../common/errors");
      const updateData = { name: "Updated Name" };
      userService.update.mockRejectedValue(new NotFoundError("User with id user999 not found"));

      const res = await request(app)
        .put("/users/user999")
        .send(updateData);

      expect(res.statusCode).toEqual(404);
      expect(res.body).toEqual({
        status: "error",
        message: "User with id user999 not found",
      });
    });

    it("should handle update errors gracefully", async () => {
      const updateData = { name: "Updated Name" };
      const errorMessage = "Failed to update user";

      userService.update.mockRejectedValue(new AppError(errorMessage, 500));

      const res = await request(app)
        .put("/users/user1")
        .send(updateData);

      expect(res.statusCode).toEqual(500);
      expect(res.body).toEqual({
        status: "error",
        message: "Failed to update user",
      });
    });
  });

  describe("DELETE /users/:userId", () => {
    it("should delete an existing user", async () => {
      userService.remove.mockResolvedValue();

      const res = await request(app).delete("/users/user1");

      expect(res.statusCode).toEqual(200);
      expect(res.body).toEqual({ message: "User deleted successfully" });
      expect(userService.remove).toHaveBeenCalledWith("user1");
    });

    it("should return 404 when user is not found", async () => {
      const { NotFoundError } = require("../../../common/errors");
      userService.remove.mockRejectedValue(new NotFoundError("User with id user999 not found"));

      const res = await request(app).delete("/users/user999");

      expect(res.statusCode).toEqual(404);
      expect(res.body).toEqual({
        status: "error",
        message: "User with id user999 not found",
      });
    });

    it("should handle deletion errors gracefully", async () => {
      const errorMessage = "Failed to delete user";

      userService.remove.mockRejectedValue(new AppError(errorMessage, 500));

      const res = await request(app).delete("/users/user1");

      expect(res.statusCode).toEqual(500);
      expect(res.body).toEqual({
        status: "error",
        message: "Failed to delete user",
      });
    });
  });
});