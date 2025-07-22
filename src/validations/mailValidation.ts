import { Types } from "mongoose";
import z from "zod";

export const sendMailSchema = z.object({
  email: z.email("invalid email format"),
  subject: z.string().min(5, "The subject must be greater than 5 characters"),
  body: z.string().min(5, "The body must be greater than 5 characters"),
});
