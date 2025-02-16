import express, { Request, Response } from "express";
import * as z from "zod";
import jwt from "jsonwebtoken";
import { Account, User } from "../lib/schema";
import { jwt_secret } from "../config";
import { authCheck } from "../middleware";
import { AuthenticatedRequest } from "../types";
import bcrypt from "bcryptjs";

export const router = express.Router();
router.use(express.json());

const UserSignupZodValidationSchema = z.object({
  email: z.string().email().toLowerCase().min(5).max(50),
  firstName: z.string().min(5).max(20),
  lastName: z.string().min(5).max(20),
  password: z.string().min(5).max(50),
});

type signupUserBody = z.infer<typeof UserSignupZodValidationSchema>;

router.post("/signup", async (req: Request, res: Response) => {
  try {
    const signupBody: signupUserBody = req.body;
    const parsed = UserSignupZodValidationSchema.safeParse(signupBody);
    if (!parsed.success) {
      return res.status(400).send({ error: "Incorrect inputs" });
    }
    const { email, password, firstName, lastName } = parsed.data;

    const existingUser = await User.findOne({ email: signupBody.email });
    if (existingUser) {
      return res
        .status(401)
        .send({ error: "Email already taken / Incorrect inputs" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });
    const savedUser = await newUser.save();

    if (!savedUser) {
      return res.status(500).send({ error: "Error while saving user" });
    }

    const token = jwt.sign({ userId: savedUser._id }, jwt_secret, {
      expiresIn: "1h",
    });

    const userBalanceAccount = new Account({
      balance: Math.floor(Math.random() * 10000 + 1),
      userId: savedUser._id,
    });
    const savedAccount = await userBalanceAccount.save();
    if (!savedAccount) {
      return res.status(500).send({ error: "Error while saving account" });
    }

    res.cookie("token", token, { httpOnly: true, secure: true });

    return res
      .status(200)
      .send({ message: "User created successfully", token });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ message: "Something went wrong while signing up" });
  }
});

const UserSigninZodValidationSchema = z.object({
  email: z.string().email().toLowerCase().min(5).max(50),
  password: z.string().min(5).max(50),
});

//NOTE: any password encryption and email verification is not done here, as this was just for practice
type signinUserBody = z.infer<typeof UserSigninZodValidationSchema>;
router.post("/signin", authCheck, async (req: Request, res: Response) => {
  try {
    const signinBody: signinUserBody = req.body;
    const parsed = UserSigninZodValidationSchema.safeParse(signinBody);
    if (!parsed.success) {
      return res.status(400).send({ error: "Incorrect inputs" });
    }
    const { email, password } = parsed.data;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      const isPasswordCorrect = await bcrypt.compare(
        password,
        existingUser.password,
      );
      if (isPasswordCorrect) {
        const token = jwt.sign({ userId: existingUser._id }, jwt_secret);
        res.cookie("token", token, { httpOnly: true, secure: true });
        return res
          .status(200)
          .send({ message: "User signed in successfully", token });
      }
    }
  } catch (error) {}
});
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
    console.log(err);
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
    console.log(error);
    return res.status(500).send({ error: "Error while fetching user" });
  }
});
