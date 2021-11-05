import { NextFunction, Request, Response, Router } from "express";
import User from "../Models/user.model";
import Mentee from "../Models/mentee.model";
import axios, { AxiosResponse } from "axios";
import dotenv from "dotenv";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import Association from "../Models/association.model";

dotenv.config();

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

const getProfile = (req: Request, res: Response, next: NextFunction) => {
  const user: any = req.user;
  return res.json({ email: user.email, name: user.first_name });
};

const updateProfile = (req: Request, res: Response, next: NextFunction) => {
  const user: any = req.user;
  const query = { email: user.email };
  const changes = req.body;

  User.findOneAndUpdate(query, changes, { new: true }, (err, doc) => {
    if (err) res.status(400).json(err);
    return res.status(200).json(doc);
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

async function getViewsAPIRequestData(url: string) {
  let result = "Nan";
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
      result = response.data;
    })
    .catch((error) => {
      result = error;
    });
  return result;
}

const getViewUsers = async (req: Request, res: Response) => {
  const type: string = req.params.type;
  let url: string =
    "https://app.viewsapp.net/api/restful/contacts/" + type + "/search?q=";
  const result = await getViewsAPIRequestData(url);
  res.send(result);
  return result;
};

function addUsertoDB(userFields: any) {
  const temporaryPass: string = "admin123";
  bcrypt.hash(temporaryPass, 10, (hashError, hashedPassword) => {
    if (hashError) {
      return {
        message: hashError.message,
        error: hashError,
      };
    }
    let userType = "Admin";
    if (userFields["TypeName"] == "volunteer") {
      userType = "Mentor";
    }
    const newUser = new User({
      _id: new mongoose.Types.ObjectId(),
      views_id: userFields["PersonID"],
      first_name: userFields["Forename"],
      last_name: userFields["Surname"],
      email:
        (userFields["Email"] as string) || ("NO EMAIL ASSOCIATED" as string),
      activity_status:
        userFields["VolunteerStatus_V_1"] || ("Active" as string),
      password: hashedPassword as string,
      role: userType,
    });
    newUser.save().catch((error) => {
      return console.log("Error adding user", error);
    });
    console.log(`added user ${userFields["Forename"]}`);
  });
}

function addMenteetoDB(menteeFields: any) {
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
  console.log(`added mentee ${menteeFields["Forename"]}`);
}

const validateAndCreateRecordsinDB = (
  recordFields: any,
  recordType: string
) => {
  const ViewsID = recordFields["PersonID"];
  if (recordType == "user") {
    User.find({ views_id: ViewsID }).exec(function (err, user) {
      if (err) {
        console.log(err);
      } else if (user.length == 0) {
        return addUsertoDB(recordFields);
      } else {
        console.log(`User data already present`);
      }
    });
  } else if (recordType == "mentee") {
    Mentee.find({ views_id: ViewsID }).exec(function (err, mentee) {
      if (err) {
        console.log(err);
      } else if (mentee.length == 0) {
        return addMenteetoDB(recordFields);
      } else {
        console.log("Mentee data already present");
      }
    });
  } else {
    console.error("No such recordtype exists");
  }
};

const iterateOnViewsData = (viewsJsonData: any, recordType: string) => {
  for (const key in viewsJsonData) {
    const viewsUsers = viewsJsonData[key];
    for (const key1 in viewsUsers) {
      const userFields = viewsUsers[key1];
      try {
        validateAndCreateRecordsinDB(userFields, recordType);
      } catch (error) {
        console.log("Error adding the user ");
        console.log(error);
        continue;
      }
    }
  }
};

const migrateUsers = async (req: Request, res: Response) => {
  let typeOfUser: string = "volunteers";
  let url: string =
    "https://app.viewsapp.net/api/restful/contacts/" +
    typeOfUser +
    "/search?q=";
  const viewsVolData = JSON.parse(await getViewsAPIRequestData(url));
  try {
    iterateOnViewsData(viewsVolData, "user");
  } catch (error) {
    return res.status(500).json({
      message: "Failed to add all Users from Views",
    });
  }

  //We have to iterate twice because Views get request to staff does not provide VolunteerStatus when we call it
  typeOfUser = "staff";
  url =
    "https://app.viewsapp.net/api/restful/contacts/" +
    typeOfUser +
    "/search?q=";
  const viewsStaffData = JSON.parse(await getViewsAPIRequestData(url));
  try {
    iterateOnViewsData(viewsStaffData, "user");
  } catch (error) {
    return res.status(500).json({
      message: "Failed to add all Users from Views",
    });
  }

  res.send("Migrated Views Mentors and Admins Successfully!");
};

const migrateMentees = async (req: Request, res: Response) => {
  const url: string =
    "https://app.viewsapp.net/api/restful/contacts/participants/search?q=";
  const viewsMenteeData = JSON.parse(await getViewsAPIRequestData(url));
  try {
    iterateOnViewsData(viewsMenteeData, "mentee");
  } catch (error) {
    console.log("Error migrating all mentees from Views", error);
    return res.status(500).json({
      message: "Error migrating all mentees from Views",
    });
  };
  res.send("Migrated Views Mentees Successfully!");
};

const createGoalForMentee = (req: Request, res: Response) => {
  let { 
    mentee_id, goal_text 
  } = req.body;

  Association.findOneAndUpdate({ 
    _id: mentee_id
  }, {
    $push: {
      goals: {
        name: goal_text,
        is_complete: false
      }
    }
  }, {new: true}).then((result) => {
    return res.status(201).json({ result });
  })
};

const createGoalForAssociation = (req: Request, res: Response) => {
  let { mentee_id_to_match, goal_text } = req.body;

  Association.findOneAndUpdate(
    {
      _id: mentee_id_to_match,
    },
    {
      $push: {
        goals: {
          name: goal_text,
          is_complete: false,
        },
      },
    },
    { new: true }
  ).then((result) => {
      return res.status(201).json({ result });
    })
    .catch((error) => {
      return res.status(500).json({
        message: error.message,
        error,
      });
    });
};

const getAssociationById = (req: Request, res: Response) => {
  const menteeId: string = req.params.id;
  Association.findOne({_id: menteeId}).exec().then((profileObj) => {
    return res.status(200).json({profileObj})
  }).catch((error) => {
    console.log({error});
    return res.status(404).json({
      message: "Error: Mentee id not found."
    });
  });
};

const updateAssociationById = (req: Request, res: Response) => {
  const menteeId: string = req.params.id;
  let { new_mentor_id, new_mentee_name, new_isActive } = req.body;

  Association.findOneAndUpdate({ 
    _id: menteeId
  }, {
    mentor_id: new_mentor_id,
    mentee_name: new_mentee_name,
    isActive: new_isActive
  }, (error: any, data: any) => {
    if (error) {
      return res.status(404).json({
        message: "Error in updating mentee profile."
      });
    } else if (data) {
      return res.status(200).json({data});
    }
  });
};
export default {
  addUser,
  getUsers,
  getViewUsers,
  register,
  validateToken,
  migrateUsers,
  migrateMentees,
  createGoalForAssociation,
  getAssociationById,
  updateAssociationById,
  getProfile,
  updateProfile,
};
