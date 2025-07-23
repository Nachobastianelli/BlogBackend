import { Types } from "mongoose";
import { z } from "zod";
import { objectIdField } from "../utils/validateID";

const contentItemSchema = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("text"),
    value: z.string(),
  }),
  z.object({
    type: z.literal("image"),
    value: z.object({
      url: z.string().url(),
      alt: z.string().optional(),
    }),
  }),
]);

export const createPostSchema = z.object({
  title: z
    .string({
      required_error: "Title is required",
      invalid_type_error: "Title must be a string",
    })
    .min(1, "Title must have at least 1 character long"),
  description: z
    .string({
      required_error: "Description is required",
      invalid_type_error: "Description must be a string",
    })
    .min(10, "Description must have at least 10 characters long"),
  cover: z
    .string({
      required_error: "Cover is required",
      invalid_type_error: "Cover must be a valid URL",
    })
    .url("Invalid URL"),
  content: z
    .array(contentItemSchema)
    .nonempty("Content must have at least one item"),
  userId: objectIdField("userId"),
  date: z.coerce.date(), // acepta string y lo convierte a Date
});

export const updatePostSchema = z
  .object({
    title: z
      .string({ invalid_type_error: "Title must be a string" })
      .min(1, "Title must have at least 1 character long")
      .optional(),
    description: z
      .string({ invalid_type_error: "Description must be a string" })
      .min(10, "Description must have at least 10 character long")
      .optional(),
    cover: z
      .string({ invalid_type_error: "Cover must be a URL" })
      .url("Invalid URL")
      .optional(),
    content: z
      .array(contentItemSchema)
      .nonempty("Content must have at least one item")
      .optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field must be provided to update",
  });
