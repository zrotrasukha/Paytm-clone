import mongoose from "mongoose";

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
    const db = await mongoose.connect(process.env.MONGODB_PASSSWORD || "");
    connection.isConnected = db.connections[0].readyState;
  } catch (error) {
    console.log("Error occured connetion mongoDB", error);
    process.exit(1);
  }
}
