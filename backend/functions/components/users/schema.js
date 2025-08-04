const { z } = require("zod");

const createUserSchema = z.object({
  body: z.object({
    name: z.string().min(1, "Name is required"),
    zipCode: z.string().regex(/^\d{5}$/, "Zip code must be exactly 5 digits"),
  }),
});

const updateUserBodySchema = z.object({
  name: z.string().min(1, "Name is required").optional(),
  zipCode: z.string().regex(/^\d{5}$/, "Zip code must be exactly 5 digits").optional(),
});

const updateUserSchema = z.object({
  params: z.object({
    id: z.string().min(1, "ID is required"),
  }),
  body: updateUserBodySchema,
});

module.exports = { createUserSchema, updateUserBodySchema, updateUserSchema };