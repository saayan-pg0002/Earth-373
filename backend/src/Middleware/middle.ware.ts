import { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";
import User, { Role } from "../Models/user.model";
import passportLocal from "passport-local";
import { errorHandler } from "../util";
import getCurrentLine from "get-current-line";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, "../.env") });

const LocalStrategy = passportLocal.Strategy;

export const strategize = (passport: any) => {
  passport.serializeUser((user: any, done: any) => {
    done(undefined, user.id);
  });

  passport.deserializeUser((id: any, done: any) => {
    User.findById(id, (err: any, user: any) => {
      const info = {
        _id: user._id,
        email: user.email,
        views_id: user.views_id,
        first_name: user.first_name,
        last_name: user.last_name,
        activity_status: user.activity_status,
        role: user.role,
      };
      done(err, info);
    });
  });
  passport.use(
    "signIn",
    new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
      User.findOne({
        email: email,
      }).then((user) => {
        //if email is not found
        if (!user) {
          return done(null, false, {
            message: "That email is not registered",
          });
        }

        // otherwise, compare password
        bcrypt.compare(password, user.password as string, (err, isMatch) => {
          if (err) throw err;
          if (isMatch) {
            return done(null, user, { message: "login successful" });
          } else {
            return done(null, false, { message: "Password incorrect" });
          }
        });
      });
    })
  );

  // More strategies go here ...
};

const verifyJWT = (
  req: Request,
  callback: (error: Error | any, role: Role | undefined) => void
) => {
  console.log("Validating Token...", req.headers.authorization);
  let token = (req.headers.authorization as string).split(" ")[1];
  // const token = req.cookies.jwt;
  try {
    jwt.verify(token, "TOKEN_SECRET", (error: any, payload: any) => {
      if (error) {
        return callback(error, undefined);
      } else if (payload) {
        console.log("Validation Successful");
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
      return res
        .status(400)
        .json(errorHandler(error, "isAdmin", `line ${getCurrentLine().line}`));
    } else {
      if (role === Role.Admin) {
        console.log("hello admin");
        return next();
      } else
        return res.status(401).json({
          unauthorized: "You do not have the permission to access this route",
        });
    }
  });
};

export const isUser = (req: Request, res: Response, next: NextFunction) => {
  verifyJWT(req, (error) => {
    if (error) {
      return res
        .status(400)
        .json(errorHandler(error, "isUser", `line ${getCurrentLine().line}`));
    } else {
      console.log("hello user");
      return next();
    }
  });
};

export const signJWT = (req: Request, res: Response) => {
  const user: any = req.user;
  var currentTime = new Date().getTime();
  var expirationTimeInMS = (currentTime + 3600) * 100000;
  var expirationTimeInSeconds = Math.floor(expirationTimeInMS / 1000);

  console.log(`Attempting to sign token for ${user.email}`);

  try {
    jwt.sign(
      {
        email: user.email,
        password: user.password,
        role: user.role,
      },
      "TOKEN_SECRET",
      {
        issuer: "BayTreeDevs",
        algorithm: "HS256",
        expiresIn: expirationTimeInSeconds,
      },
      (error, token) => {
        if (error) {
          return res.status(400).json({ error });
        } else if (token) {
          res.cookie("jwt", token);
          console.log("Signing successful");
          return res.status(200).json({ "signed token": token });
        }
      }
    );
  } catch (e) {
    console.log("Error. Please ctrl+f to see where this is.\n");
  }
};
