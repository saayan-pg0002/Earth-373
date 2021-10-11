import express, { Application, Request, Response, NextFunction } from "express";
import mongoose, { Schema } from "mongoose";
import dotenv from "dotenv";
import UserRouter from "./Routes/user.route";
import Schedule from "./Models/schedule.model";
import User from "./Models/user.model";

dotenv.config({path: __dirname + '/.env'});
const app: Application = express();
const URI: string | any = process.env.MONGO_URI;
const URI_LOCAL: string | any = process.env.MONGO_URI_LOCAL;

mongoose.connect(URI_LOCAL).then(() => {
  console.log("Mongodb is connected... ");
});

const port: string | number = process.env.PORT || 5000;

/** Rules of our API */
app.use(express.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    ",Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method == "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

/** Routes go here */
app.use("/users", UserRouter);

/** Error Handling */
app.use((req, res, next) => {
  const error: Error = new Error("Not found");
  res.status(404).json({
    message: error.message,
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

export default app;
