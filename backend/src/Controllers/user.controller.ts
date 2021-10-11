import { json, NextFunction, Request, Response } from "express";
import User from "../Models/user.model";
import axios, { AxiosResponse } from "axios";
import dotenv from "dotenv";
import mongoose from "mongoose";
import logging from "../config/logging";

dotenv.config();

//Authentication functions
const NAMESPACE = "User"

//CHANGE/GET RID OF THIS FUNCTION
const validateToken = (req: Request, res: Response, next: NextFunction) => {
  logging.info(NAMESPACE, "Token validated, user authorized");
  return res.status(200).json({
    message: "Authorized"
  })
}

const register = (req: Request, res: Response, next: NextFunction) => {
  let { username, password } = req.body;
}

const login = (req: Request, res: Response, next: NextFunction) => {
  
}

const getAllUsers = (req: Request, res: Response, next: NextFunction) => {
  
}

const addUser = (req: Request, res: Response, next: NextFunction) => {
  let {
    views_id,
    first_name,
    last_name,
    email,
    activity_status,
    user_type,
  } = req.body;

  const user = new User({
    _id: new mongoose.Types.ObjectId(),
    views_id,
    first_name,
    last_name,
    email,
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
};

const getUsers = (req: Request, res: Response, next: NextFunction) => {
  User.find()
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


const createUsersFromViews = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //Getting JSON format dtata from views
  const viewsData = JSON.parse(await getViewUsers(req,res,next));
  //Iterating to check for new users added, if yes then adding to db collection
  for (const key in viewsData){
    const viewsUsers = viewsData[key];
    for (const key1 in viewsUsers){
        const userFields = viewsUsers[key1];
        const ViewsPersonID = userFields['PersonID'];
        User.find({views_id: ViewsPersonID})
        .exec(function (err,user) {
          if(err){
            console.log(err);
          }else if (user.length == 0){
            //TO DO CHECK USER VALUES WHICH ARE NOT PRESENT IN GETREQUEST LIKE EMAIL AND USERTYPE
            const user = new User({
              _id: new mongoose.Types.ObjectId(),
              views_id: ViewsPersonID,
              first_name: userFields['Forename'],
              last_name: userFields['Surname'],
              email:  userFields['Email'] as string | "dummyemail@sfu.ca",
              email:  userFields['Email'] as string || "dummyemail@sfu.ca" as string,
              activity_status: "Suspended",
              user_type: "Mentor"
            });
            user.save()
            .then((result) => {
              console.log("user added!");
            })
            .catch((error) => {
              return console.log("Error adding user",error);
            });

          }else{
            console.log(`User ${userFields['Forename']} already Present in the DataBase`);
          }
        });
    }
  }
};


const getViewUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const result: AxiosResponse = await axios({
    method: "get",
    url: "https://app.viewsapp.net/api/restful/contacts/staff/search?q=a",
    auth: {
      username: process.env.VIEW_USERNAME as string,
      password: process.env.VIEW_PASSWORD as string,
    },
    responseType: 'json',
    transformResponse: [v => v],
  });

  const data = result.data;
  res.send(data);
  return data;
};


export default { 
  addUser,
  getUsers,
  getViewUsers,
  register, 
  login, 
  validateToken, 
  getAllUsers,
  createUsersFromViews,
};
