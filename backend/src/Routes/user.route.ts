import express, { Router } from "express";
import UserController from "../Controllers/user.controller";
import { isLoggedIn, isAdmin, login } from "../Middleware/middleWare";

const router: Router = express.Router();

router.route("/mongo/add").post(UserController.addMongoUser);
router
  .route("/getusers")
  .get(isLoggedIn, isAdmin, UserController.getMongoUsers);

router.route("/view/get/:type").get(UserController.getViewUsers);
router.route("/view/migrate").get(UserController.migrateViewUsers);

router
  .route("/me/association/goals")
  .post(UserController.getGoalsForAssociation);

router.route("/creategoal").post(UserController.createGoalForAssociation);
router
  .route("/me/associations")
  .get(isLoggedIn, UserController.getAssociationsFromMentor);
router.route("/create-association").post(UserController.createAssociation);

router.route("/me").get(isLoggedIn, UserController.getProfile);

router.route("/forgot-password").post(UserController.forgotPassword);
router.route("/reset-password").post(UserController.resetPassword);

router.route("/login").post(login);

export default router;
