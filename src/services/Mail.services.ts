import dotenv from "dotenv";
import { Router } from "express";
import { sendMailSchema } from "../validations/mailValidation";
import { transporter } from "../utils/mailer";
import { ZodError } from "zod";

dotenv.config();
const router = Router();

router.post("/login", async (req, res) => {
  try {
    const { email, subject, body } = sendMailSchema.parse(req.body);

    const response = await transporter.sendMail({
      from: process.env.EMAIL || "no-reply@example.com",
      to: email,
      subject,
      html: body,
    });

    if (process.env.NODE_ENV !== "production") {
      console.log("Email response:", response);
    }

    return res
      .status(200)
      .json({ data: response, message: "The mail was sent successfully" });
  } catch (error) {
    if (error instanceof ZodError) {
      return res
        .status(400)
        .json({ error: "Validation error", details: error });
    }

    console.error("Internal server error", error);
    return res.status(500).send("Internal server error");
  }
});

export default router;
