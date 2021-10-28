import { NextFunction, Request, Response, Router } from "express";
import Mentee from "../Models/mentee.model";
import axios, { AxiosResponse } from "axios";
import dotenv from "dotenv";
import mongoose from "mongoose";
import UserController from "../Controllers/user.controller";

dotenv.config();
var router = Router();

const createMenteesFromViews = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const url: string =
    "https://app.viewsapp.net/api/restful/contacts/participants/search?q=";
  const result = JSON.parse(await UserController.getViewsAPIRequestData(url));
  console.log("Created new Route for mentee migration!");
  res.send("Created new Route for mentee migration!");
};

export default { createMenteesFromViews };
