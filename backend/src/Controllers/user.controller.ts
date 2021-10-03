import { NextFunction, Request, Response } from "express";
import User from "../Models/user.model";
import IUser from "../Interfaces/user.interface";
import http from "http";
import https from "https";
import fetch from "node-fetch";
import axios, { AxiosResponse } from "axios";

const addUser = (req: Request, res: Response, next: NextFunction) => {
  //   const defunt: IUser = req.body as IUser;
  console.log(req.body);
  res.send(req.body);
  //     const first_name: String = defunt.first_name as String;
  //     const last_name: String = req.body.last_name as String;
  //     const DOB: Date = req.body.DOB as Date;
  //     const email: String = req.body.email as String;
  //     const phone_num: String = req.body.phone_num as String;
  //     const activity_status: String = req.body.activity_status as String;
  //     const start_date: Date = req.body.start_date as Date;
  //     const user_type: String = req.body.user_type as String;
  //     const user = new User({
  //       first_name: "Dice",
  //       last_name: "Luckman",
  //       DOB: new Date(2020, 4, 30),
  //       email: "Nah",
  //       phone_num: "blahblah",
  //       activity_status: "no",
  //       start_date: new Date(2030, 2, 13),
  //       user_type: "jojo",
  //     });
  //     return user
  //       .save()
  //       .then((result) => {
  //         return res.status(201).json({
  //           user: result,
  //         });
  //       })
  //       .catch((error) => {
  //         return res.status(500).json({
  //           message: error.message,
  //           error,
  //         });
  //       });
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

const getViewUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const result: AxiosResponse = await axios({
    method: "get",
    url: "https://app.viewsapp.net/api/restful/contacts/staff/search?q=a",
    auth: {
      username: "group.earth",
      password: "Earthpassword1.",
    },
  });

  const data = result.data;
  res.send(data);
};

export default { addUser, getUsers, getViewUsers };
