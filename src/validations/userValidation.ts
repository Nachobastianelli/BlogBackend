import { z } from "zod";

const nameField = (fieldName: string) => {
  return z
    .string({
      required_error: `${fieldName} is required`,
      invalid_type_error: `${fieldName} must be a string`,
    })
    .min(2, `${fieldName} must have at least 2 characters long`);
};

const optionalNameField = (fieldName: string) => {
  return z
    .string({
      invalid_type_error: `${fieldName} must be a string`,
    })
    .min(2, `${fieldName} must have at least 2 characters long`)
    .optional();
};

const passwordSchema = z
  .string({
    invalid_type_error: "Password must be a string",
    required_error: "Password is required",
  })
  .min(8, "Password must have at least 8 characters long")
  .regex(/^(?=.*[A-Z])(?=.*\d).+$/, {
    message:
      "Password must contain at least one uppercase letter and one digit",
  });

export const createUserSchema = z.object({
  firstname: nameField("firstname"),
  lastname: nameField("lastname"),
  mail: z
    .string({
      required_error: "Email is required",
      invalid_type_error: "Email must be a string and email format",
    })
    .email("Invalid email address"),
  phone: z
    .string({ invalid_type_error: "Phone must be a string" })
    .min(9, "Phone must have at least 9 characters")
    .optional()
    .or(z.literal("")), //para permitir strings vacios
  avatar: z
    .string({ invalid_type_error: "Path must be a string" })
    .url("Avatar must be a valid URL") // si es URL
    .optional()
    .or(z.literal("")),
  password: passwordSchema,
});

export const updateUserSchema = z
  .object({
    firstname: optionalNameField("firstname"),
    lastname: optionalNameField("lastname"),
    mail: z
      .string({ invalid_type_error: "Email must be a string" })
      .email("Invalid email address")
      .optional(),
    phone: z
      .string({ invalid_type_error: "Phone must be a string" })
      .min(9, "Phone must have at least 9 characters")
      .optional(),
    avatar: z
      .string({ invalid_type_error: "Path must be a string" })
      .url("Avatar must be a valid URL") // si es URL
      .optional()
      .or(z.literal("")),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field must be provided to update",
  });
