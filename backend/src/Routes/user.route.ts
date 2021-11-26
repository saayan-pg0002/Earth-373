import express, { Router } from "express";
import UserController from "../Controllers/user.controller";
import * as middleware from "../Middleware/middleWare";

const router: Router = express.Router();

router.post(
  "/me/association/goals",
  middleware.isLoggedIn,
  UserController.getGoalsForAssociation
);
router.post(
  "/creategoal",
  middleware.isLoggedIn,
  UserController.createGoalForAssociation
);
router.get(
  "/me/associations",
  middleware.isLoggedIn,
  UserController.getAssociationsFromMentor
);
router.post("/login", middleware.login);
router.post("/forgot-password", UserController.forgotPassword);
router.post("/reset-password", UserController.resetPassword);
router.get("/profile/me", middleware.isLoggedIn, UserController.getMyProfile);

/* Admin only routes */
router.post(
  "/mongo/add",
  middleware.isLoggedIn,
  middleware.isAdmin,
  UserController.addMongoUser
);
router.get(
  "/getusers",
  middleware.isLoggedIn,
  middleware.isAdmin,
  UserController.getMongoUsers
);
router.get(
  "/view/get/:type",
  middleware.isLoggedIn,
  middleware.isAdmin,
  UserController.getViewUsers
);
router.get(
  "/view/migrate",
  middleware.isLoggedIn,
  middleware.isAdmin,
  UserController.migrateViewUsers
);
router.post(
  "/create-association",
  middleware.isLoggedIn,
  middleware.isAdmin,
  UserController.createAssociation
);
router.put(
  "/profile/edit/:id",
  middleware.isLoggedIn,
  middleware.isAdmin,
  UserController.editProfile
);
router.get(
  "/get/:type",
  middleware.isLoggedIn,
  middleware.isAdmin,
  UserController.getUsers
);

export default router;
