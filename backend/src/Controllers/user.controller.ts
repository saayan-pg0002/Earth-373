import { NextFunction, Request, Response } from "express";
import User from "../Models/user.model";
import axios, { AxiosResponse } from "axios";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const addUser = (req: Request, res: Response, next: NextFunction) => {
  let {
    first_name,
    last_name,
    DOB,
    email,
    phone_num,
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
    phone_num,
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

const getViewUsers = async (req: Request, res: Response) => {
  const type: string = req.params.type;
  let url: string =
    "https://app.viewsapp.net/api/restful/contacts/" + type + "/search?q=a";

  axios({
    method: "get",
    url: url,
    auth: {
      username: process.env.VIEW_USERNAME as string,
      password: process.env.VIEW_PASSWORD as string,
    },
  })
    .then((response: AxiosResponse) => {
      res.send(response.data);
    })
    .catch((error) => {
      console.log(error);
      res.send(error);
    });
};

const createViewUser = async (req: Request, res: Response) => {
  let {
    fname,
    lname,
    dob,
    estimated_dob,
    address1,
    postcode,
    mobile,
    personID,
    emergency_fname,
    emergency_lname,
    emergency_mobile,
    relationship,
    special_needs,
    nationality,
    first_language,
    ethnicity,
  } = req.body;

  const newUser = {
    Forename: fname,
    Surname: lname,
    DateOfBirth: dob,
    Estimated_P_217: estimated_dob,
    Address1: address1,
    Postcode: postcode,
    Mobile: mobile,
    PersonID: personID,
    EmergencyContact1FirstName_P_206: emergency_fname,
    EmergencyContact1LastName_P_207: emergency_lname,
    Telnomobile_P_47: emergency_mobile,
    Relationship_P_44: relationship,
    Specificrequirementsrelevanttoaccessingourservice_P_230: special_needs,
    Nationality_P_86: nationality,
    FirstLanguage_P_88: first_language,
    Ethnicity: ethnicity,
  };

  const type: string = req.params.type;
  let url: string = "https://app.viewsapp.net/api/restful/contacts/" + type;

  axios({
    method: "post",
    url: url,
    auth: {
      username: process.env.VIEW_USERNAME as string,
      password: process.env.VIEW_PASSWORD as string,
    },
    data: newUser,
  })
    .then((response: AxiosResponse) => {
      res.send(response.data);
    })
    .catch((error) => {
      console.log(error);
      res.send(error);
    });
};

function foo() {
  // console.log(JSON.stringify(data));
  // console.log(JSON.stringify({ x: "ASDA", y: "ASD" }));
}

export default {
  addUser,
  getUsers,
  getViewUsers,
  createViewUser,
};
