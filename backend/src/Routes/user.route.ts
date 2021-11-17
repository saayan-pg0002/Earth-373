import express, { Request, Response, Router } from "express";
import UserController from "../Controllers/user.controller";
import passportConfig from "../Middleware/middle.ware";
import passport from "passport";

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
router.route("/createassociation").post(UserController.createAssociation);

router
  .route("/login")
  .post(passport.authenticate("signIn"), passportConfig.signJWT);

router.route("/me").get(passportConfig.authenticate, UserController.getProfile);

router.route("/forgot-password").post(UserController.forgotPassword);
router.route("/reset-password").post(UserController.resetPassword);

export default router;
