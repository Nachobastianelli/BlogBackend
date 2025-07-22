import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import { connectDB } from "./config/db";
import userRouter from "./routers/User.routes";
import emailRouter from "./services/Mail.services";
import "./events/eventsListeners";
import { transporter } from "./utils/mailer";

dotenv.config();

const app = express();

const port = process.env.PORT ?? 1111;

app.use(helmet());
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

connectDB();

app.use("/api/users", userRouter);

app.use("/api/email", emailRouter);

app.get("/", (req, res) => {
  res.send("Welcome to the Blog Development API!");
});

app.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`);
});
