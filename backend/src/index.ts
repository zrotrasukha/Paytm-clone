import express from "express";
import { router as rootRouter } from "./routes/index";
import cors from "cors";
import jwt from "jsonwebtoken";

const PORT = 3000;
const app = express();

app.use(express.json());
app.use(cors());
app.use("/api/v1", rootRouter);

app.listen(PORT, () => {
  console.log("the site is live now at port 3000");
});
