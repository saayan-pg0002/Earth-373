import express, { Application, Request, Response, NextFunction } from "express";
import mongoose, { Schema } from "mongoose";
import dotenv from "dotenv";
import restaurants from "./route";

dotenv.config();
const app: Application = express();

mongoose.connect("mongodb://localhost:27017/Baytree").then(() => {
  console.log("Mongodb is connected... ");
});

const port: string | number = process.env.PORT || 5000;

const uri: string = process.env.LOCAL as string;
const restaurant_uri: string = process.env.RESTAURANTS_URI as string;
mongoose.connect(uri);
const connection = mongoose.connection;

connection.once("open", () => {
  console.log("Connection successful.");
  var Schema = mongoose.Schema;
  var Restaurants = mongoose.model("Restaurants", new Schema({}), "testdata");
  Restaurants.find({}, function (err, doc) {
    console.log(doc);
  });
});

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.use("/restaurants", restaurants);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

export default app;
