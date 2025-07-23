import { Types } from "mongoose";
import { z } from "zod";

export const objectIdField = (fieldName = "ID") =>
  z
    .string({
      required_error: `${fieldName} is required.`,
      invalid_type_error: `${fieldName} must be a string`,
    })
    .refine((val) => Types.ObjectId.isValid(val), {
      message: `${fieldName} is not a valid ObjectId`,
    });
