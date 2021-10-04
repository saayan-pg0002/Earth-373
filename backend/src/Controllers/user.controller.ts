import { NextFunction, Request, Response } from "express";
import User from "../Models/user.model";
import http from "http";
import https from "https";
import fetch from "node-fetch";
import axios, { AxiosResponse } from "axios";

const addUser = (req: Request, res: Response, next: NextFunction) => {
  // to do
  res.send("Placeholder");
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
