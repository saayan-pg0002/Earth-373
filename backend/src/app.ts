import express, { Application, Request, Response, NextFunction } from "express";
import mongoose, { Schema } from "mongoose";
import Schedule from "./Models/schedule.model";
import User from "./Models/user.model";

const app: Application = express();

mongoose.connect("mongodb://localhost:27017/Baytree").then(() => {
  console.log("Mongodb is connected... ");
});

const port: string | number = process.env.PORT || 5000;

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
