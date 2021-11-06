import express, { Application } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import UserRouter from "./Routes/user.route";
import passport from "passport";
import session from "express-session";
import passportConfig from "./Middleware/middleWare";
import cookie from "cookie-parser";
import cors from "cors";

dotenv.config();
const app: Application = express();
const URI: string | any = process.env.MONGO_URI;

mongoose.connect(URI).then(() => {
  console.log("Mongodb is connected... ");
});

const port: string | number = process.env.PORT || 5000;

/** use cookie */
app.use(cookie());

/** use sessions */
app.use(
  session({
    secret: "session secret",
    resave: true,
    saveUninitialized: true,
  })
);

/** Initialize passports */
passportConfig.strategize(passport);
app.use(passport.initialize());
app.use(passport.session());

/** Rules of our API */
app.use(express.json());
app.use(cors());

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
