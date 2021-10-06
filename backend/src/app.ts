import express, { Application, Request, Response, NextFunction } from "express";
import mongoose, { Schema } from "mongoose";
import dotenv from "dotenv";
import UserRouter from "./Routes/user.route";

dotenv.config();
const app: Application = express();
const uri: string | any = process.env.MONGO_URI_LOCAL;

mongoose.connect(uri).then(() => {
  console.log("Mongodb is connected... ");
});

const port: string | number = process.env.PORT || 5000;

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.use("/users", UserRouter);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

export default app;
