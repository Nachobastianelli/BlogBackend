import { z } from "zod";

const passwordSchema = z
  .string()
  .min(8, "Debe tener al menos 8 caracteres")
  .regex(/^(?=.*[A-Z])(?=.*\d).+$/, {
    message: "Debe tener al menos una mayúscula y un número",
  });

export const createUserSchema = z.object({
  firstname: z.string().min(2, "El nombre es obligatorio"),
  lastname: z.string().min(2, "El apellido es obligatorio"),
  mail: z.email(),
  phone: z
    .string()
    .min(9, "El telefono debe ser mayor a 9 caracteres")
    .optional(),
  avatar: z.string().min(1).optional(),
  password: passwordSchema,
});

export const updateUserSchema = z.object({
  firstname: z.string().min(2, "El nombre debe ser mas largo").optional(),
  lastname: z
    .string()
    .min(2, "El apellido debe ser mayor a 2 caracteres")
    .optional(),
  mail: z.email().optional(),
  phone: z.string().optional(),
});
