import express, { Router } from "express";
import UserController from "../Controllers/user.controller";
import { isLoggedIn, isAdmin, login } from "../Middleware/middleWare";

const router: Router = express.Router();

router.get("/me", isLoggedIn, UserController.getMyProfile);
router.post(
  "/me/association/goals",
  isLoggedIn,
  UserController.getGoalsForAssociation
);
router.post("/creategoal", isLoggedIn, UserController.createGoalForAssociation);
router.get(
  "/me/associations",
  isLoggedIn,
  UserController.getAssociationsFromMentor
);
router.post("/login", login);
router.post("/forgot-password", UserController.forgotPassword);
router.post("/reset-password", UserController.resetPassword);
router.get("/profile/me", isLoggedIn, UserController.getMyProfile);
router.get("/stats", UserController.getStatistcs);

/* Admin only routes */
router.post("/mongo/add", isLoggedIn, isAdmin, UserController.addMongoUser);
router.get("/getusers", isLoggedIn, isAdmin, UserController.getMongoUsers);
router.get("/view/get/:type", isLoggedIn, isAdmin, UserController.getViewUsers);
router.get(
  "/view/migrate",
  isLoggedIn,
  isAdmin,
  UserController.migrateViewUsers
);
router.post(
  "/create-association",
  isLoggedIn,
  isAdmin,
  UserController.createAssociation
);
router.put(
  "/profile/edit/:id",
  isLoggedIn,
  isAdmin,
  UserController.editProfile
);
router.get("/get/:type", isLoggedIn, isAdmin, UserController.getUsers);

export default router;
