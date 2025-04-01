import { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();

export const authToken = (req: Request, res: Response, next: NextFunction) => {
  const bearerToken = req.headers.authorization?.split(" ")[1];
  if (!bearerToken) {
    res.status(403).json({ error: "Missing authentification token" });
    return;
  }
  try {
    const decodedToken = jwt.verify(bearerToken, process.env.JWT_SECRET!);
    (req as any).user = decodedToken;
    next();
  } catch {
    res.status(403).json("Failed to authenticate");
  }
};

export const validateRegistered = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(400).json({ error: "Missing required fields" });
  }

  const emailRegex = /^\S+@\S+\.\S+$/;
  if (!emailRegex.test(email)) {
    res.status(400).json({ error: "Invalid email format" });
  }

  if (password.length < 7) {
    res.status(400).json({ error: "Password is too short" });
  }

  next();
};

export const validateLogin = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ error: "Email and password required" });
  }

  next();
};
