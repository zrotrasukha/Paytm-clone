import { JsonWebTokenError } from "jsonwebtoken";
import jwt from "jsonwebtoken";
import { jwt_secret } from "./config.js";
import { NextFunction, Response } from "express";
import { AuthenticatedRequest } from "./types.js";

export const authCheck = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).send({ error: "No token provided, please signup" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, jwt_secret!) as { userId: string };
    if (typeof decoded !== "string" && "userId" in decoded) {
      req.userId = decoded.userId;
      next();
    }
  } catch (error) {
    if (error instanceof JsonWebTokenError) {
      return res.status(401).json({ message: "Invalid token", error });
    }
    return res.status(500).json({ message: "Internal Server Error", error });
  }
};
