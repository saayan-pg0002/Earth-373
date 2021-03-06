import { Request, Response } from "express";
import User from "../Models/user.model";
import Mentee from "../Models/mentee.model";
import dotenv from "dotenv";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import Association from "../Models/association.model";
import AssociationInterface from "../Interfaces/association.interface";
import jwt from "jsonwebtoken";
import path from "path";
import nodemailer from "nodemailer";
import _ from "lodash";
import Session from "../Models/session.model";
import { sendViewsRequests, errorHandler, http } from "../util";

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

const getHashedPassword = async (
  password: string,
  callback: (hash: string) => void
) => {
  bcrypt.hash(password, 10, (hashError, hash) => {
    if (hashError) {
      throw hashError;
    } else {
      callback(hash);
    }
  });
};

const addMongoUser = (req: Request, res: Response) => {
  let {
    first_name,
    last_name,
    DOB,
    email,
    password,
    activity_status,
    start_date,
    role
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
    role
  });

  return user
    .save()
    .then((result) => {
      return res.status(201).json({
        message: "Successfully saved user to the database.",
        user: result
      });
    })
    .catch((error) => {
      return res.status(500).json({
        message: "Error adding user to the database.",
        error
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
        count: users.length
      });
    })
    .catch((error) => {
      return res.status(500).json({
        message: "Error getting user from the database.",
        error
      });
    });
};

const getViewsUsers = async (req: Request, res: Response) => {
  try {
    const url: string = "https://app.viewsapp.net/api/restful/contacts/";
    const result: any = await sendViewsRequests(
      url + `${req.params.type}/search`,
      http.get,
      undefined
    );
    if (result.ERROR) return res.status(400).json(result);
    return res.status(200).json(result.data);
  } catch (error) {
    return res
      .status(400)
      .json({ function: "getViewsUsers", error: errorHandler(error) });
  }
};

const migrateViewsUsers = async (req: Request, res: Response) => {
  try {
    // base url
    const url: string = "https://app.viewsapp.net/api/restful/contacts/";

    // mentors
    const mentors: any = await sendViewsRequests(
      url + "volunteers/search",
      http.get,
      undefined
    );
    if (mentors.ERROR) return res.status(400).json(mentors);
    await createUsers(mentors.data);

    // admins
    const staffs: any = await sendViewsRequests(
      url + "staff/search",
      http.get,
      undefined
    );
    if (staffs.ERROR) return res.status(400).json(staffs);
    await createUsers(staffs.data);

    // mentees
    const mentees: any = await sendViewsRequests(
      url + "participants/search",
      http.get,
      undefined
    );
    if (mentees.ERROR) return res.status(400).json(mentees);
    await createMentees(mentees.data);

    return res.status(200).json({ response: "All View entries migrated" });
  } catch (error) {
    return res
      .status(400)
      .json({ function: "migrateViewsUsers", error: errorHandler(error) });
  }
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
                  error: hashError
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
                resetLink: ""
              });
              const token = jwt.sign(
                { _id: newUser._id },
                process.env.JWT_KEY as string,
                {
                  expiresIn: "25m"
                }
              );
              const mailOptions = {
                from: "baytree.earth@yahoo.com",
                to: userFields["Email"] as string,
                subject: "Password Reset Link",
                html: ` <h1> Hello ${newUser.first_name} ${newUser.last_name} !
                        <h2>Please click on the link below to set your password.</h2>
                        <br>
                        <a href="http://${process.env.URL}/reset-password/${token}">http://${process.env.URL}/reset-password/${token}</a>`
              };
              emailTransporter.sendMail(
                mailOptions,
                (error: any, info: any) => {
                  if (error)
                    console.log(
                      `Cannot send password reset link to ${newUser.email}}`,
                      error
                    );
                  console.log("Password reset link sent:", info);
                }
              );
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
              dateOfBirth: DoB
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

const createGoalForAssociation = (req: Request, res: Response) => {
  let { association_id, goal } = req.body;

  Association.findOneAndUpdate(
    {
      _id: association_id
    },
    {
      $push: {
        goals: {
          goal_name: goal,
          created_at: Date.now(),
          updated_at: Date.now(),
          is_complete: false
        }
      }
    },
    { new: true }
  )
    .then((result) => {
      if (result == null) {
        return res.status(500).json({
          message: "Warning: Mentor/Mentee pair not found. Are they active?"
        });
      }
      return res.status(201).json({
        message: "Successfully created goal for mentorship.",
        result
      });
    })
    .catch((error) => {
      return res.status(500).json({
        message: "Error creating goal for the mentee/mentor association."
      });
    });
};

const getMenteesForMentor = (req: Request, res: Response) => {
  const user: any = req.user;
  const mentor_id: string = user._id as string;

  Association.find({ mentor_id })
    .exec()
    .then((associations) => {
      const menteeIds: String[] = associations.map(
        (association) => association.mentee_id
      );

      Mentee.find(
        { _id: { $in: menteeIds } },
        "_id first_name last_name age dateOfBirth"
      ).exec((err, mentees) => {
        if (err || mentees.length !== associations.length) {
          return res.status(400).json({
            error:
              "One of the mentees in the specified associations does not exist."
          });
        }

        const associationsWithMenteeName: any[] = associations.map(
          (association) => {
            const mentee: any = mentees.find(
              (currentMentee) =>
                currentMentee._id.toString() ===
                association.mentee_id.toString()
            );

            if (!mentee) {
              return res.status(400).json({
                error:
                  "One of the mentees in the specified associations does not exist."
              });
            }

            return {
              association_id: association._id,
              is_active: association.isActive,
              mentee_name: `${mentee.first_name} ${mentee.last_name}`,
              birthday: `${mentee.dateOfBirth}`,
              start_date: association.start_date,
              end_date: association.end_date
            };
          }
        );

        return res.status(200).json({ mentees: associationsWithMenteeName });
      });
    })
    .catch((error) => {
      return res.status(404).json({
        message: "Error: Mentees not found.",
        error
      });
    });
};

const getAssociationForMentorById = (req: Request, res: Response) => {
  const user: any = req.user;
  const mentor_id: string = user._id as string;
  const association_id: string = req.params.id as string;

  Association.findOne({ _id: association_id, mentor_id: mentor_id })
    .exec()
    .then((association) => {
      if (!association) {
        return res.status(400).json({
          error: "Error: Association not found."
        });
      }

      Mentee.findOne({ _id: association.mentee_id }).exec((err, mentee) => {
        if (err || !mentee) {
          return res.status(400).json({
            error: "Error: The mentee for this association does not exist."
          });
        }

        return res.status(200).json({
          ...association.toJSON(),
          mentee: mentee.toJSON()
        });
      });
    })
    .catch((error) => {
      return res.status(404).json({
        error: "Error: Association not found."
      });
    });
};

const getGoalsForAssociation = (req: Request, res: Response) => {
  let { association_id } = req.body;
  const user: any = req.user;
  const mentor_id: string = user._id;

  Association.findOne({ _id: association_id, mentor_id: mentor_id })
    .exec()
    .then((result: any) => {
      return res.status(200).json({
        goals: result.goals
      });
    })
    .catch((error) => {
      return res.status(400).json({
        message: "Error: Unable to find mentor/mentee association.",
        error: error.message
      });
    });
};

const updateGoalsForAssociation = (req: Request, res: Response) => {
  try {
    const { association_id, goal_id, goal_name, is_complete } = req.body;

    Association.findOneAndUpdate(
      { _id: association_id, "goals._id": goal_id },
      {
        $set: {
          "goals.$.goal_name": goal_name,
          "goals.$.is_complete": is_complete,
          "goals.$.updated_at": Date.now(),
          "goals.$.completed_at": is_complete === true ? Date.now() : null
        }
      }
    )
      .then(() => {
        return res.json({ updated: `${goal_id}` });
      })
      .catch((error) => {
        return res.status(400).json({
          function: "updateGoalsForAssociation",
          error: errorHandler(error)
        });
      });
  } catch (error) {
    return res.status(400).json({
      function: "updateGoalsForAssociation",
      error: errorHandler(error)
    });
  }
};

const emailTransporter = nodemailer.createTransport({
  host: "smtp.mail.yahoo.com",
  port: 465,
  service: "yahoo",
  secure: false,
  auth: {
    user: process.env.BAYTREE_EMAIL as string,
    pass: process.env.BAYTREE_EMAIL_SECRET as string
  },
  tls: { rejectUnauthorized: false },
  debug: false,
  logger: true
});

const forgotPassword = (req: Request, res: Response) => {
  console.log("Change Password");
  const mail = req.body.email;
  console.log(mail);
  User.findOne({ email: mail }).exec((err, user) => {
    if (err || !user) {
      return res
        .status(400)
        .json({ error: "User with this email does not exist" });
    }

    const token = jwt.sign({ _id: user._id }, process.env.JWT_KEY as string, {
      expiresIn: "20m"
    });

    const mailOptions = {
      from: "baytree.earth@yahoo.com",
      to: mail,
      subject: "Password Reset Link",
      html: ` <h2>Please click on the link below to reset your password</h2>
              <br>
              <a href="http://${process.env.URL}/reset-password/${token}">http://${process.env.URL}/reset-password/${token}</a>`
    };

    return user.updateOne(
      { resetLink: token },
      function (err: any, success: any) {
        if (err) {
          return res.status(400).json({ error: "Reset password link error" });
        } else {
          // send email to user
          emailTransporter.sendMail(mailOptions, (error: any, info: any) => {
            if (error) {
              return console.log(error);
            }
            console.log("Message sent: %s", info.messageId);
          });
          return res.json({
            message: "Email has been sent, kindly follow the instructions"
          });
        }
      }
    );
  });
};

const createAssociation = (req: Request, res: Response) => {
  let { mentor_id, mentee_id, start_date } = req.body;

  Association.findOne({
    mentor_id: mentor_id,
    mentee_id: mentee_id,
    isActive: true
  }).exec((err, association) => {
    if (association) {
      return res.status(400).json({
        error: "This specific Mentor-Mentee association is already active"
      });
    }
    User.findOne({ _id: mentor_id }).exec((err, user) => {
      if (err || !user) {
        return res.status(400).json({
          error: "Specified Mentor does not exist"
        });
      }
      Mentee.findOne({ _id: mentee_id }).exec((err, mentee) => {
        if (err || !mentee) {
          return res
            .status(400)
            .json({ error: "Specified Mentee does not exist" });
        }
        const newAssociation: AssociationInterface = new Association({
          mentor_id: mentor_id,
          mentee_id: mentee_id,
          start_date: new Date(start_date),
          isActive: true
        });

        newAssociation
          .save()
          .then((result) => {
            return res.status(200).json({
              message: "Successfully created association",
              result
            });
          })
          .catch((err) => {
            return res.status(400).json({
              message: "Error creating association :",
              err
            });
          });
      });
    });
  });
};

const resetPassword = (req: Request, res: Response) => {
  const { resetLink, newPass } = req.body;
  if (resetLink) {
    jwt.verify(
      resetLink,
      process.env.JWT_KEY as string,
      (err: any, decodedData: any) => {
        if (err) {
          return res.status(401).json({ error: "Incorrect or expired token " });
        }
        User.findOne({ resetLink }).exec((err, user: any) => {
          if (err || !user) {
            return res
              .status(400)
              .json({ error: "User with this token does not exist." });
          }
          getHashedPassword(newPass, (hash: string) => {
            const obj = {
              password: hash,
              resetLink: ""
            };

            user = _.extend(user, obj);

            user!.save((err: any, result: any) => {
              if (err) {
                return res.status(400).json({ error: "Reset password error " });
              } else {
                return res
                  .status(200)
                  .json({ message: "Your password has been changed " });
              }
            });
          });
        });
      }
    );
  } else {
    return res.status(401).json({ error: "Authentication Error " });
  }
};

const getMyProfile = (req: Request, res: Response) => {
  let user: any = req.user;
  delete user["password"];
  return res.status(200).json(user);
};

const editProfile = (req: Request, res: Response) => {
  const user: any = req.body.user;
  User.updateOne(
    { _id: user._id },
    {
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      activity_status: user.activity_status,
      role: user.role
    }
  ).exec((err, user) => {
    if (err) {
      res
        .status(400)
        .json({ error: "Error occured while updating profile", err });
    }
  });
};

const getStatistics = (req: Request, res: Response) => {
  const user: any = req.user;
  const mentor_id: string = user._id as string;

  let totalSessions: number,
    totalCancelled: number,
    totalCompletedGoals: number = 0,
    totalGoals: number = 0;

  Association.find({ mentor_id: mentor_id, isActive: true }).exec(
    (err, associations) => {
      if (err) {
        res.status(400).json({
          error: "Error occured during counting associations ",
          err
        });
      }
      const association_ids: any = associations.map(
        (association) => association._id as string
      );
      Session.count(
        { association_id: { $in: association_ids } },
        (err, count) => {
          if (err) {
            res
              .status(400)
              .json({ error: "Error occured during counting sessions ", err });
          }
          totalSessions = count;
          Session.count(
            { association_id: { $in: association_ids }, is_cancelled: true },
            (err, count) => {
              if (err) {
                res.status(400).json({
                  error: "Error occured during counting sessions ",
                  err
                });
              }
              totalCancelled = count;
              Association.find({
                mentor_id: mentor_id,
                isActive: true
              }).exec((err, obj: any) => {
                if (err) {
                  res.status(400).json({
                    error: "Error occured during counting goals ",
                    err
                  });
                }
                for (var association in obj) {
                  const data: any = obj[association];
                  for (var goal in data.goals) {
                    if (data.goals[goal].is_complete === true) {
                      totalCompletedGoals++;
                      totalGoals++;
                    } else {
                      totalGoals++;
                    }
                  }
                }

                res.status(200).json({
                  completed_goals: totalCompletedGoals,
                  cancelled_sessions: totalCancelled,
                  total_sessions: totalSessions,
                  total_goals: totalGoals
                });
              });
            }
          );
        }
      );
    }
  );
};

const getSpecifiedUsers = (req: Request, res: Response) => {
  const urole: string = req.params.type;
  let MENTOR: any = "Mentor";
  let ADMIN: any = "Admin";

  if (urole.toLowerCase() === "mentors") {
    User.find({ role: MENTOR })
      .select("-password")
      .exec((err, mentors) => {
        if (err) {
          res
            .status(400)
            .json({ error: "An error occured while fetching Mentors ", err });
        }
        res.status(200).json(mentors);
      });
  }

  if (urole.toLowerCase() === "mentees") {
    Mentee.find().exec((err, mentees) => {
      if (err) {
        res
          .status(400)
          .json({ error: "An error occured while fetching Mentees ", err });
      }
      res.status(200).json(mentees);
    });
  }

  if (urole.toLowerCase() === "admins") {
    User.find({ role: ADMIN })
      .select("-password")
      .exec((err, admins) => {
        if (err) {
          res
            .status(400)
            .json({ error: "An error occured while fetching Admins ", err });
        }
        res.status(200).json(admins);
      });
  }
};

const UserController = {
  addMongoUser,
  getMongoUsers,
  getViewsUsers,
  migrateViewsUsers,
  createGoalForAssociation,
  createAssociation,
  getMenteesForMentor,
  getAssociationForMentorById,
  getGoalsForAssociation,
  updateGoalsForAssociation,
  forgotPassword,
  resetPassword,
  getHashedPassword,
  getMyProfile,
  editProfile,
  getStatistics,
  getSpecifiedUsers
};

export default UserController;
