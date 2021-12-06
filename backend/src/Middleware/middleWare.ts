import { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";
import User, { Role } from "../Models/user.model";
import jwt from "jsonwebtoken";

export const login = async (req: Request, res: Response) => {
  const user: any = await User.findOne({
    email: req.body.email
  }).exec();

  if (!user) return res.status(400).send("That account does not exist");

  const isMatch = await bcrypt.compare(
    req.body.password as string,
    user.password as string
  );

  if (isMatch) {
    const JWT = signJWT(user);
    return res.json({ jwt: JWT, role: user.role });
  } else {
    return res.status(400).send("Invalid credentials");
  }
};

const signJWT = (user: any): string | any => {
  var currentTime = new Date().getTime();
  var expirationTimeInMS = (currentTime + 3600) * 100000;
  var expirationTimeInSeconds = Math.floor(expirationTimeInMS / 1000);

  return jwt.sign(
    {
      _id: user._id,
      role: user.role
    },
    "token secret",
    {
      issuer: "BayTreeDevs",
      algorithm: "HS256",
      expiresIn: expirationTimeInSeconds
    }
  );
};

const verifyJWT = (
  token: string,
  callback: (error: Error | undefined, payload: any | undefined) => void
) => {
  jwt.verify(
    token.split(" ")[1],
    "token secret",
    (error: any, payload: any) => {
      if (error) {
        return callback(error, undefined);
      } else if (payload) {
        return callback(undefined, payload);
      }
    }
  );
};

export const isAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user: any = req.user;
  if (user.role === Role.Admin) {
    return next();
  }
  return res.status(401).json({
    unauthorized: "You do not have the permission to access this page."
  });
};

export const isLoggedIn = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.headers || !req.headers.authorization)
    return res.status(400).json({ error: "Authorization header is undefined" });
  const token = req.headers.authorization as string;
  let mongoID: string = "";
  verifyJWT(token, (error, payload) => {
    if (error) {
      return res.json(error);
    } else mongoID = payload._id;
  });
  const user = await User.findById(mongoID).exec();
  if (!user) return res.status(500).json({ error: "Cannot find that user" });
  req.user = user as Express.User;
  return next();
};
