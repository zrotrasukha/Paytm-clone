import mongoose from "mongoose";
import { MONGO_URI } from "../config";

type connectionObject = {
  isConnected?: number;
};

const connection: connectionObject = {};

export default async function dbConnect(): Promise<void> {
  if (connection.isConnected) {
    console.log("Connection is already established");
    return;
  }

  try {
    const db = await mongoose.connect(MONGO_URI);
    connection.isConnected = db.connections[0].readyState;
    console.log("MongoDB connection established");
  } catch (error) {
    console.log("Error occured connetion mongoDB", error);
    process.exit(1);
  }
}
