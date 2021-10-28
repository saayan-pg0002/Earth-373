import { NextFunction, Request, Response, Router } from "express";
import Mentee from "../Models/mentee.model";
import axios, { AxiosResponse } from "axios";
import dotenv from "dotenv";
import mongoose from "mongoose";
import UserController from "../Controllers/user.controller";

dotenv.config();
var router = Router();

function addMenteetoDB(menteeFields: any) {
  const DoB: Date = new Date(menteeFields["DateOfBirth"]);
  const newMentee = new Mentee({
    _id: new mongoose.Types.ObjectId(),
    views_id: menteeFields["PersonID"],
    first_name: menteeFields["Forename"],
    last_name: menteeFields["Surname"],
    age: menteeFields["Age"],
    dateOfBirth: DoB,
  });
  newMentee.save().catch((error) => {
    return console.log("Error adding Mentee to DB", error);
  });
  console.log(`added mentee ${menteeFields["Forename"]}`);
}

const checkandCreateMenteeinDB = (menteeFields: any) => {
  const ViewsID = menteeFields["PersonID"];
  Mentee.find({ views_id: ViewsID }).exec(function (err, mentee) {
    if (err) {
      console.log(err);
    } else if (mentee.length == 0) {
      //TODO
      addMenteetoDB(menteeFields);
    } else {
      console.log("Mentee data already present");
    }
  });
};

const iterateOnViewsData = (viewsJsonData: any) => {
  for (const key in viewsJsonData) {
    const viewMentee = viewsJsonData[key];
    for (const key1 in viewMentee) {
      const menteeFields = viewMentee[key1];
      checkandCreateMenteeinDB(menteeFields);
    }
  }
};

const createMenteesFromViews = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const url: string =
    "https://app.viewsapp.net/api/restful/contacts/participants/search?q=";
  const viewsMenteeData = JSON.parse(
    await UserController.getViewsAPIRequestData(url)
  );
  iterateOnViewsData(viewsMenteeData);
  res.send("Migrated Views Mentees Successfully!");
};

export default { createMenteesFromViews };
