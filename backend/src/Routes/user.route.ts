import express, { Router } from "express";
import UserController from "../Controllers/user.controller";
import passportConfig from "../Middleware/middleWare";
import passport from "passport";

const router: Router = express.Router();

router.post("/mongo/add", UserController.addMongoUser);
router.get("/getusers", UserController.getMongoUsers);
router.get("/view/get/:type", UserController.getViewUsers);
router.get("/view/migrate", UserController.migrateViewUsers);
router.post("/me/association/goals", UserController.getGoalsForAssociation);
router.post("/creategoal", UserController.createGoalForAssociation);
router.get("/me/associations", UserController.getAssociationsFromMentor);
router.post("/create-association", UserController.createAssociation);
router.post("/login", passport.authenticate("signIn"), passportConfig.signJWT);
router.get("/me", passportConfig.authenticate, UserController.getProfile);
router.post("/forgot-password", UserController.forgotPassword);
router.post("/reset-password", UserController.resetPassword);
router.get("/profile/me", UserController.getMyProfile);

/* Admin only routes */
router.post("/profile/edit", UserController.editProfile);

export default router;
