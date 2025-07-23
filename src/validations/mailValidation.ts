import z from "zod";

export const sendMailSchema = z.object({
  email: z
    .string({
      invalid_type_error: "Email must be a string",
      required_error: "Email is required",
    })
    .email("Invalid email address"),
  subject: z
    .string({
      required_error: "Subject is required",
      invalid_type_error: "Subject must be a string",
    })
    .min(5, "Subject must have at least 5 characters long"),
  body: z
    .string({
      invalid_type_error: "Body must be a string",
      required_error: "Body is required",
    })
    .min(5, "Body must have at least 5 characters long"),
});
