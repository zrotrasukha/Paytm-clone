import express, { Response } from "express";
import { authCheck } from "../middleware";
import { Account } from "../lib/schema";
import { AuthenticatedRequest } from "../types";
import mongoose from "mongoose";
export const router = express.Router();

//check user balance
router.use(express.json());

router.get(
  "/balance",
  authCheck,
  async (req: AuthenticatedRequest, res: Response) => {
    try {
      const userAccount = await Account.findOne({ userId: req.userId });
      if (!userAccount) {
        return res.status(404).send("Account not found");
      }
      return res.status(200).json({ balance: userAccount.balance });
    } catch (error) {
      return res.status(500).send("Internal server error");
    }
  },
);

router.post(
  "/transfer",
  authCheck,
  async (req: AuthenticatedRequest, res: Response) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      const { to, amount }: { to: string; amount: number } = req.body;
      const senderAccount = await Account.findOne({
        userId: req.userId,
      }).session(session);

      if (!senderAccount || amount > Number(senderAccount?.balance)) {
        await session.abortTransaction();
        return res.status(400).json({ message: "Insufficient balance" });
      }

      const receiverAccount = await Account.findOne({ userId: to }).session(
        session,
      );
      if (!receiverAccount) {
        await session.abortTransaction();
        return res.status(404).json({ message: "Invalid Account" });
      }

      await Account.updateOne(
        { userId: req.userId },
        { $inc: { balance: -amount } },
      ).session(session);

      await Account.updateOne(
        { userId: to },
        { $inc: { balance: amount } },
      ).session(session);

      res.status(200).json({ message: "Transfer successful" });

      await session.commitTransaction();
    } catch (error) {
      await session.abortTransaction();
      return res.status(500).send("Internal server error");
    }
  },
);
