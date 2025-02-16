import { JsonWebTokenError, JwtPayload } from "jsonwebtoken";
import jwt from "jsonwebtoken";
import { jwt_secret } from "./config";
import { NextFunction, Response } from "express";
import { AuthenticatedRequest } from "./types.js";
import cookie from "cookie-parser";

export const authCheck = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  if (!jwt_secret) throw new Error("JWT is missing in config");

  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, jwt_secret) as JwtPayload;
    if (!decoded || typeof decoded !== "object" || !decoded.userId) {
      return res.status(401).json({ message: "Invalid token payload" });
    }
    req.userId = decoded.userId;
    next();
  } catch (error) {
    if (error instanceof JsonWebTokenError) {
      return res.status(401).json({ message: "Invalid token", error });
    }
    return res.status(500).json({ message: "Internal Server Error", error });
  }
};
