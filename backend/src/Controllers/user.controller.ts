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
  const viewsData = JSON.parse(await getViewUsers(req,res,next));
  for (const key in viewsData){
    const obj = viewsData[key];

    for (const key1 in obj){
        const obj2 = obj[key1];
        const ViewsPersonID = obj2['PersonID'];

        User.find({views_id: ViewsPersonID})
        .exec(function (err,user) {
          if(err){
            console.log(err);
          }else if (user.length == 0){
            //TO DO ADD USERS WHICH ARE NOT FOUND
            console.log(`User: ${obj2['Forename']}, id: ${ViewsPersonID} not found`);
          }else{
            console.log("user found" ,user);
          }
        });
    }
  }
  
  // const ViewsPersonID = '36';
  // console.log(typeof ViewsPersonID);
 
    res.send("Done..");
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
