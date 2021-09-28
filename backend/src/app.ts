import express, { Application, Request, Response, NextFunction } from "express";

const app: Application = express();
const port: string | number = process.env.PORT || 5000;

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
