import { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";
import User from "../Models/user.model";
import passportLocal from "passport-local";
// import passportJWT from "passport-jwt";
import jwt from "jsonwebtoken";

const LocalStrategy = passportLocal.Strategy;

const strategize = (passport: any) => {
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
        role: user.role
      };
      done(err, info);
    });
  });
  passport.use(
    "signIn",
    new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
      User.findOne({
        email: email
      }).then((user) => {
        //if email is not found
        if (!user) {
          return done(null, false, {
            message: "That email is not registered"
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

const verifyJWT = (req: Request, res: Response, next: NextFunction) => {
  console.log("Validating Token...");
  // let token = req.headers.authorization?.split(" ")[1];
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, "session secret", (error: any, decoded: any) => {
      if (error) {
        return res.status(400).json({
          message: error.message,
          error
        });
      } else if (decoded) {
        console.log("Validation Successful");
        next();
      }
    });
  } else {
    return res.status(401).json({
      message: "JWT is undefined"
    });
  }
};

const authenticate = (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) {
    return res.status(401).json({ message: "You are not signed in" });
  }
  verifyJWT(req, res, next);
};

const signJWT = (req: Request, res: Response) => {
  const user: any = req.user;
  var currentTime = new Date().getTime();
  var expirationTimeInMS = (currentTime + 3600) * 100000;
  var expirationTimeInSeconds = Math.floor(expirationTimeInMS / 1000);

  console.log(`Attempting to sign token for ${user.email}`);

  try {
    jwt.sign(
      {
        email: user.email,
        password: user.password
      },
      "session secret",
      {
        issuer: "BayTreeDevs",
        algorithm: "HS256",
        expiresIn: expirationTimeInSeconds
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

export default { strategize, authenticate, signJWT };
