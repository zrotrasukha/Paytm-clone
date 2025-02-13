import dotenv from "dotenv";
dotenv.config();

export const jwt_secret = process.env.JWT_SECRET as string;
export const MONGO_URI = process.env.MONGODB_URI as string;

if (!jwt_secret || !MONGO_URI) {
  throw new Error("Missing environment variables! Check your .env file");
}
