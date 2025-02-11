import express, { Request, Response } from "express";
import * as z from "zod";
import jwt from "jsonwebtoken";
import { Account, User } from "../lib/schema";
import { jwt_secret } from "../config.js";
import { authCheck } from "../middleware";
import { AuthenticatedRequest } from "../types";

export const router = express.Router();
router.use(express.json());

const UserSignupZodValidationSchema = z.object({
  email: z.string().email().toLowerCase().min(5).max(20),
  firstName: z.string().min(5).max(20),
  lastName: z.string().min(5).max(20),
  password: z.string().min(10).max(50),
});

type signupUserBody = z.infer<typeof UserSignupZodValidationSchema>;

router.post("/signup", async (req: Request, res: Response) => {
  try {
    const signupUserBody: signupUserBody = req.body;
    if (!UserSignupZodValidationSchema.safeParse(signupUserBody).success) {
      return res.status(400).send({ error: "Incorrect inputs" });
    }
    const existingUser = await User.findOne({ email: signupUserBody.email });

    if (existingUser) {
      return res
        .status(401)
        .send({ error: "Email already taken / Incorrect inputs" });
    }
    const randomAccountBalance = Math.floor(Math.random() * 10000 + 1);

    //use creation:
    const newUser = await User.create(signupUserBody);
    const userId = newUser._id;

    //account creation
    await Account.create({ userId, balance: randomAccountBalance });

    const token = jwt.sign({ userId }, jwt_secret!);

    return res.status(200).send({
      message: "User created successfully",
      token,
    });
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Something went wrong while signing up" });
  }
});

const UserSigninZodValidationSchema = z.object({
  email: z.string().email().toLowerCase().min(4).max(20),
  password: z.string().min(9).max(50),
});

type signinUserBody = z.infer<typeof UserSigninZodValidationSchema>;
router.post(
  "/signin",
  authCheck,
  async (req: AuthenticatedRequest, res: Response) => {
    const { userId } = req.body;
    const signinUserBody: signinUserBody = req.body;

    if (!UserSigninZodValidationSchema.safeParse(signinUserBody).success) {
      return res.status(401).send({ error: "Incorrect inputs" });
    }
    const existingUser = await User.findOne({ userId });

    if (existingUser) {
      const token = jwt.sign({ userId }, jwt_secret);
      return res.json({ message: "User signed in successfully", token });
    }

    return res.status(411).json({ message: "Error while logging in" });
  },
);

const UserUpdateZodValidationSchema = z.object({
  password: z.string().min(10).max(50),
  firstName: z.string().min(5).max(20),
  lastName: z.string().min(5).max(20),
});

type updateBody = z.infer<typeof UserUpdateZodValidationSchema>;

router.put("/", authCheck, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const updateBody: updateBody = req.body;

    if (!UserUpdateZodValidationSchema.safeParse(updateBody).success) {
      return res.status(400).send({ error: "Incorrect inputs" });
    }

    await User.updateOne({ userId: req.userId }, updateBody);
    return res.status(200).send({ message: "User updated successfully" });
  } catch (err) {
    return res.status(500).send({ error: "Error while updating user" });
  }
});

router.get("/bulk", async (req: Request, res: Response) => {
  try {
    const searchedUsername = req.query.filter || "";
    const users = await User.find({
      $or: [
        { firstName: { $regex: searchedUsername } },
        { lastName: { $regex: searchedUsername } },
      ],
    });
    if (!users) {
      return;
    }
    return res.json({
      user: users.map((user) => ({
        usernae: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        _id: user._id,
      })),
    });
  } catch (error) {
    return res.status(500).send({ error: "Error while fetching user" });
  }
});
