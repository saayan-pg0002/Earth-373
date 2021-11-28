import express, { Application } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import UserRouter from "./Routes/user.route";
import cors from "cors";
import path from "path";
import QuestionnaireRouter from "./Routes/questionnaire.route";

dotenv.config({ path: path.resolve(__dirname, "../.env") });

const app: Application = express();
const URI: string | any = process.env.MONGO_URI;

mongoose.connect(URI).then(() => {
  console.log("Mongodb is connected... ");
});

const port: string | number = process.env.PORT || 5000;

/** Rules of our API */
app.use(express.json());
app.use(cors());

/** Routes go here */
app.use("/users", UserRouter);
app.use("/questionnaires", QuestionnaireRouter);

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
