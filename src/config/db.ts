import mongoose from "mongoose";
import { logger } from "../utils/logger";

const MONGODB_URI =
  process.env.MONGODB_URI ?? "mongodb://localhost:27017/blogDB";

export const connectDB = async () => {
  try {
    logger.info("Starting DB server...");
    await mongoose.connect(MONGODB_URI);
    logger.success("MongoDB connected!");
  } catch (err) {
    logger.error(`Error connecting to MongoDB: ${err}`);
    process.exit(1);
  }
};
