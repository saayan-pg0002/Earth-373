import express, { Router } from "express";
import UserController from "../Controllers/user.controller";
import * as middleware from "../Middleware/middleWare";
import User from "../Models/user.model";

const router: Router = express.Router();

router.route("/mongo/add").post(UserController.addMongoUser);
router.route("/getusers").get(UserController.getMongoUsers);

router.route("/view/get/:type").get(UserController.getViewUsers);
router.route("/view/migrate").get(UserController.migrateViewUsers);

router
  .route("/me/association/goals")
  .post(UserController.getGoalsForAssociation);

router.route("/creategoal").post(UserController.createGoalForAssociation);
router.route("/me/associations").get(UserController.getAssociationsFromMentor);
router.route("/create-association").post(UserController.createAssociation);

router.route("/me").get(UserController.getProfile);

router.route("/forgot-password").post(UserController.forgotPassword);
router.route("/reset-password").post(UserController.resetPassword);

router.route("/login").post(middleware.login);

// demo routes
router.route("/signedin").get(middleware.isLoggedIn, async (req, res) => {
  const mongoID: string = req.body._id;
  const user = await User.findOne({ _id: mongoID }).exec();
  return res.send(`Hello ${user!.first_name}!`);
});

router.route("/protected").get(middleware.isAdmin, async (req, res) => {
  const mongoID: string = req.body._id;
  const admin = await User.findOne({ _id: mongoID }).exec();
  return res.send(`Hello admin ${admin!.first_name}!`);
});

export default router;
