import express from "express";
import cors from "cors";
import { router as rootRouter } from "./routes/index";
import dbConnect from "./lib/db";

dbConnect();
const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3000;

app.use("/api/v1", rootRouter);

app.listen(PORT, () => {
  console.log("the site is live now at port 3000");
});
