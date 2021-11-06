import { NextFunction, Request, response, Response, Router } from "express";
import User from "../Models/user.model";
import Mentee from "../Models/mentee.model";
import axios from "axios";
import dotenv from "dotenv";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import Association from "../Models/association.model";

dotenv.config();

const addMongoUser = (req: Request, res: Response) => {
  let {
    first_name,
    last_name,
    DOB,
    email,
    password,
    activity_status,
    start_date,
    role,
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
    role,
  });

  return user
    .save()
    .then((result) => {
      return res.status(201).json({
        message: "Successfully saved user to the database.",
        user: result,
      });
    })
    .catch((error) => {
      return res.status(500).json({
        message: "Error adding user to the database.",
        error,
      });
    });
};

const getMongoUsers = (req: Request, res: Response) => {
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
        message: "Error getting user from the database.",
        error,
      });
    });
};

const getViewUsers = async (req: Request, res: Response) => {
  const result = await getViewUserType(req.params.type as string);
  if (result) {
    return res.status(200).json(result);
  }
  return res.status(400).json({ error: "unable to find users" });
};

const getViewUserType = async (userType: string) => {
  let url: string =
    "https://app.viewsapp.net/api/restful/contacts/" + userType + "/search?q=";

  let result: string = "";
  await axios({
    method: "get",
    url: url,
    auth: {
      username: process.env.VIEW_USERNAME as string,
      password: process.env.VIEW_PASSWORD as string,
    },
    responseType: "json",
    transformResponse: [(v) => v],
  })
    .then((response) => {
      result = JSON.parse(response.data);
    })
    .catch((error) => {
      result = error;
    });
  return result;
};

const migrateViewUsers = async (req: Request, res: Response) => {
  try {
    // admins
    const staffs: any = await getViewUserType("staff");
    await createUsers(staffs);

    // mentors
    const mentors: any = await getViewUserType("volunteers");
    await createUsers(mentors);

    // mentees
    const mentees: any = await getViewUserType("participants");
    await createMentees(mentees);
  } catch (error) {
    throw error;
  }
  res.status(200).json({ response: "All View entries migrated" });
};

async function createUsers(data: any) {
  for (const key in data) {
    const viewsUsers = data[key];
    for (const key1 in viewsUsers) {
      const userFields = viewsUsers[key1];
      await User.find({ views_id: userFields["PersonID"] })
        .exec()
        .then((user) => {
          if (user.length === 0) {
            const temporaryPass: string = "admin123";
            bcrypt.hash(temporaryPass, 10, (hashError, hashedPassword) => {
              if (hashError) {
                return {
                  message: hashError.message,
                  error: hashError,
                };
              }
              let userType = "Admin";
              if (userFields["TypeName"] === "volunteer") {
                userType = "Mentor";
              }
              const newUser = new User({
                _id: new mongoose.Types.ObjectId(),
                views_id: userFields["PersonID"],
                first_name: userFields["Forename"],
                last_name: userFields["Surname"],
                email:
                  (userFields["Email"] as string) ||
                  ("NO EMAIL ASSOCIATED" as string),
                activity_status:
                  userFields["VolunteerStatus_V_1"] || ("Active" as string),
                password: hashedPassword as string,
                role: userType,
              });
              newUser.save().catch((error) => {
                return console.log("Error adding user", error);
              });
              return console.log(`added user ${userFields["Forename"]}`);
            });
          } else {
            return console.log(`User ${userFields["Forename"]} already exists`);
          }
        });
    }
  }
}

async function createMentees(data: any) {
  for (const key in data) {
    const mentees = data[key];
    for (const key1 in mentees) {
      const menteeFields = mentees[key1];
      await Mentee.find({ views_id: menteeFields["PersonID"] })
        .exec()
        .then((user) => {
          if (user.length === 0) {
            const DoB: Date = new Date(menteeFields["DateOfBirth"]);
            const tempTimeDifference = Math.abs(Date.now() - DoB.getTime());
            const menteeAge: Number = Math.floor(
              tempTimeDifference / (1000 * 3600 * 24) / 365
            );
            const newMentee = new Mentee({
              _id: new mongoose.Types.ObjectId(),
              views_id: menteeFields["PersonID"],
              first_name: menteeFields["Forename"],
              last_name: menteeFields["Surname"],
              age: menteeAge,
              dateOfBirth: DoB,
            });
            newMentee.save().catch((error) => {
              return console.error("Error adding Mentee to DB", error);
            });
            return console.log(`added mentee ${menteeFields["Forename"]}`);
          } else {
            return console.log(
              `mentee ${menteeFields["Forename"]} already exists`
            );
          }
        });
    }
  }
}

const getAssociationsFromMentor = (req: Request, res: Response) => {
  const user: any = req.user;
  const mentor_id: string = user._id as string;

  Association.find({ mentor_id: mentor_id })
    .exec()
    .then((profileObj) => {
      return res.status(200).json({ profileObj });
    })
    .catch((error) => {
      return res.status(404).json({
        message: "Error: Mentee id not found.",
        error,
      });
    });
};

const getProfile = (req: Request, res: Response) => {
  const user: any = req.user;
  return res.json({
    email: user.email,
    _id: user._id,
    views_id: user.views_id,
  });
};

export default {
  addMongoUser,
  getMongoUsers,
  getViewUsers,
  getAssociationsFromMentor,
  migrateViewUsers,
  getProfile,
};
