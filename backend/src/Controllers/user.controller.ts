import { NextFunction, Request, Response, Router } from "express";
import User from "../Models/user.model";
import axios, { AxiosResponse } from "axios";
import dotenv from "dotenv";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { request } from "http";
import signJWT from "../Functions/signJWT";

dotenv.config();
var router = Router();

//Authentication functions

const validateToken = (req: Request, res: Response, next: NextFunction) => {
  console.log("Token validated, user authorized");
  return res.status(200).json({
    message: "Authorized",
  });
};

//Note: We will not be registering users this way. Use sections of this code when changing user password.
const register = (req: Request, res: Response, next: NextFunction) => {
  let {
    views_id,
    first_name,
    last_name,
    email,
    password,
    activity_status,
    user_type,
  } = req.body;

  bcrypt.hash(password, 10, (hashError, hash) => {
    if (hashError) {
      return res.status(500).json({
        message: hashError.message,
        error: hashError,
      });
    }

    //CREATING NEW USER: Find way to avoid duplication here. See if you can send the req body to '/users/add'.
    const user = new User({
      _id: new mongoose.Types.ObjectId(),
      views_id,
      first_name,
      last_name,
      email,
      password: hash,
      activity_status,
      user_type,
    });

    return user
      .save()
      .then((result) => {
        return res.status(201).json({
          user: result,
        });
      })
      .catch((error) => {
        return res.status(500).json({
          message: error.message,
          error,
        });
      });
    //End of creating + adding user to db code
  });
};

const login = (req: Request, res: Response, next: NextFunction) => {
  let { email, password } = req.body;

  User.find({ email })
    .exec()
    .then((users) => {
      if (users.length !== 1) {
        return res.status(401).json({
          message: "Authorization Failed.",
        });
      }

      const userToLogin = users[0];
      bcrypt.compare(
        password,
        <string>userToLogin.password,
        (error, result) => {
          if (error) {
            console.log(error.message);
            return res.status(401).json({
              message: "Authentication Failed: Passwords Do Not Match.",
            });
          } else if (result) {
            signJWT(userToLogin, (error, token) => {
              if (error) {
                console.log("Unable to sign token: ", error.message);
                return res.status(401).json({
                  message: "Failed To Sign JWT.",
                });
              } else if (token) {
                console.log("Token signed, authentication successful.");
                return res.status(200).json({
                  message: "Authorization Successful.",
                  token,
                  user: userToLogin,
                });
              }
            });
          } else {
            console.log("Authentication Failed.");
            return res.status(401).json({
              message: "Authentication Failed: Incorrect Password.",
            });
          }
        }
      );
    })
    .catch((error) => {
      return res.status(500).json({
        message: error.message,
        error,
      });
    });
};

const addUser = (req: Request, res: Response, next: NextFunction) => {
  let {
    first_name,
    last_name,
    DOB,
    email,
    password,
    activity_status,
    start_date,
    user_type,
  } = req.body;

  const user = new User({
    _id: new mongoose.Types.ObjectId(),
    first_name,
    last_name,
    DOB,
    email,
    password,
    activity_status,
    start_date,
    user_type,
  });

  return user
    .save()
    .then((result) => {
      return res.status(201).json({
        user: result,
      });
    })
    .catch((error) => {
      return res.status(500).json({
        message: error.message,
        error,
      });
    });
};

const getUsers = (req: Request, res: Response, next: NextFunction) => {
  User.find()
    .select("-password")
    .exec()
    .then((users) => {
      return res.status(200).json({
        users: users,
        count: users.length,
      });
    })
    .catch((error) => {
      return res.status(500).json({
        message: error.message,
        error,
      });
    });
};

async function getViewsAPIRequestData(
  url: string
) {
  let result = "Nan";
  await axios({
    method: "get",
    url: url,
    auth: {
      username: process.env.VIEW_USERNAME as string,
      password: process.env.VIEW_PASSWORD as string,
    },
    responseType: 'json',
    transformResponse: [v => v],
  })
  .then((response) => {
    result = response.data;
  })
  .catch((error) => {
    result = error;
  });
  return result;
};

const getViewUsers = async (req: Request, res: Response) => {
  const type: string = req.params.type;
  let url: string =
    "https://app.viewsapp.net/api/restful/contacts/" + type + "/search?q=";
  const result = await getViewsAPIRequestData(url);
  res.send(result);
  return result;
};

const checkAndCreateOneUserinDB = (
  userFields: any,
) => {
  const ViewsPersonID = userFields['PersonID'];
  User.find({views_id: ViewsPersonID})
  .exec(function (err,user) {
    if(err){
      console.log(err); 
    }else if (user.length == 0){
      //This is the temporary password all users will get for first time
      let userType = "Admin";
      const temppass = "admin123";
      if(userFields['TypeName'] == "volunteer"){
        userType = "Mentor";
      }
      //Hashing the password using bcrypt
      bcrypt.hash(temppass, 10, (hashError, hashedPassword) => {
        if (hashError) {
          return {
            message: hashError.message,
            error: hashError,
          };
        }

        const newUser = new User({
          _id: new mongoose.Types.ObjectId(),
          views_id: ViewsPersonID,
          first_name: userFields['Forename'],
          last_name: userFields['Surname'],
          email:  userFields['Email'] as string || "NO EMAIL ASSOCIATED" as string,
          activity_status: userFields['VolunteerStatus_V_1'] || "Active" as string,
          password: hashedPassword as string,
          user_type: userType
        });
        newUser.save()
        .catch((error) => {
          return console.log("Error adding user",error);
        });
        console.log(`added user ${userFields['Forename']}`);
      });
    }else{
      console.log(`User present`);
    }
  });
};

const iterateOnViewsData = (
  viewsJsonData: any,
) => {
  for (const key in viewsJsonData){
    const viewsUsers = viewsJsonData[key];
    for (const key1 in viewsUsers){
        const userFields = viewsUsers[key1];
        checkAndCreateOneUserinDB(userFields);
    }
  }
};

const createUsersFromViews = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  //Getting Volunteer data from Views
  let typeOfUser: string = "volunteers";
  let url: string = "https://app.viewsapp.net/api/restful/contacts/"+ typeOfUser +"/search?q=";
  const viewsVolData = JSON.parse(await getViewsAPIRequestData(url));
  iterateOnViewsData(viewsVolData);

  //We have to iterate twice because Views get request to staff does not provide VolunteerStatus when we call it
  typeOfUser = "staff";
  url = "https://app.viewsapp.net/api/restful/contacts/"+ typeOfUser +"/search?q=";
  const viewsStaffData = JSON.parse(await getViewsAPIRequestData(url));
  iterateOnViewsData(viewsStaffData);

  res.send("Done");
};


export default {
  addUser,
  getUsers,
  getViewUsers,
  register,
  login,
  validateToken,
  createUsersFromViews
};
