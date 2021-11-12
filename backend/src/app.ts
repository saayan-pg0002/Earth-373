import express, { Application } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import UserRouter from "./Routes/user.route";
import SessionRouter from "./Routes/session.route";
import passport from "passport";
import session from "express-session";
import Passport from "./Middleware/middle.ware";
import cookie from "cookie-parser";
import cors from "cors";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, "../.env") });

const app: Application = express();
const URI: string | any = process.env.MONGO_URI;

mongoose
  .connect(URI)
  .then(() => {
    console.log("Mongodb is connected... ");
  })
  .catch((error) => {
    console.log(error);
  });

const port: string | number = process.env.PORT || 5000;

/** use cookie */
app.use(cookie());

/** use sessions */
app.use(
  session({
    secret: "SESSION_SECRET",
    resave: true,
    saveUninitialized: true,
  })
);

/** Initialize passports */
Passport.strategize(passport);
app.use(passport.initialize());
app.use(passport.session());

/** Rules of our API */
app.use(express.json());
app.use(cors());

/** Routes go here */
app.use("/users", UserRouter);
app.use("/sessions", Passport.authenticate, SessionRouter);

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
