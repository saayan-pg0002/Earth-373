import { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";
import User, { Role } from "../Models/user.model";
import jwt from "jsonwebtoken";

export const login = async (req: Request, res: Response) => {
  const user: any = await User.findOne({
    email: req.body.email,
  }).exec();

  if (!user) return res.status(400).send("That account does not exist");

  const isMatch = await bcrypt.compare(
    req.body.password as string,
    user.password as string
  );

  if (isMatch) {
    const JWT = signJWT(user);
    return res.json({ jwt: JWT });
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
      role: user.role,
    },
    "token secret",
    {
      issuer: "BayTreeDevs",
      algorithm: "HS256",
      expiresIn: expirationTimeInSeconds,
    }
  );
};

const verifyJWT = (
  req: Request,
  callback: (error: Error | any, role: Role | undefined) => void
) => {
  try {
    let token = (req.headers.authorization as string).split(" ")[1];
    jwt.verify(token, "token secret", (error: any, payload: any) => {
      if (error) {
        return callback(error, undefined);
      } else if (payload) {
        return callback(undefined, payload.role);
      }
    });
  } catch (error) {
    return callback(error, undefined);
  }
};

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  verifyJWT(req, (error, role) => {
    if (error) {
      return res.status(400).send(error.message);
    } else {
      if (role === Role.Admin) {
        return next();
      } else
        return res
          .status(401)
          .send("You are not authorized to access this page");
    }
  });
};

export const isLoggedIn = (req: Request, res: Response, next: NextFunction) => {
  verifyJWT(req, (error) => {
    if (error) {
      return res.status(400).send(error);
    } else {
      return next();
    }
  });
};
