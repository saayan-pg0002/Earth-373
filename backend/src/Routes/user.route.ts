import express, { Request, Response, Router } from "express";
import UserController from "../Controllers/user.controller";
import passportConfig from "../Middleware/middleWare";
import passport from "passport";

const router: Router = express.Router();

router.route("/mongo/add").post(UserController.addMongoUser);
router.route("/getusers").get(UserController.getMongoUsers);

router.route("/view/get/:type").get(UserController.getViewUsers);
router.route("/view/migrate").get(UserController.migrateViewUsers);

// router.route("/creategoal").post(UserController.createGoalForAssociation);
router.route("/me/associations").get(UserController.getAssociationsFromMentor);

router
  .route("/login")
  .post(passport.authenticate("signIn"), passportConfig.signJWT);

router.route("/me").get(passportConfig.authenticate, UserController.getProfile);

export default router;
