import { Types } from "mongoose";
import { z } from "zod";

export const createPostSchema = z.object({
  title: z.string().min(1, "El titulo es obligatorio"),
  description: z
    .string()
    .min(10, "La descripcion es obligatoria y debe ser >= 10 ;)"),
  cover: z.string().url("Debe ser una URL válida"),
  content: z.array(
    z.object({
      type: z.string(),
      value: z.any(),
    })
  ),
  userId: z.string().regex(/^[0-9a-fA-F]{24}$/, "ID de usuario inválido"), // validamos que parezca un ObjectId
  date: z.coerce.date(), // acepta string y lo convierte a Date
});

export const updatePostSchema = z.object({
  title: z.string().min(1).optional(),
  description: z.string().min(1).optional(),
  cover: z.string().url("Debe ser una URL válida").optional(),
  content: z
    .array(
      z.object({
        type: z.string(),
        value: z.any(),
      })
    )
    .optional(),
});

//Para validar el id que viene por la request para eliminar/actualizar un Post
export const objectIdSchema = z
  .string()
  .refine((val) => Types.ObjectId.isValid(val), {
    message: "ID inválido",
  });
