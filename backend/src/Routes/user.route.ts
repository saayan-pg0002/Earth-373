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
router.put(
  "/update-goal",
  isLoggedIn,
  UserController.updateGoalsForAssociation
);
router.get(
  "/me/associations/:id",
  isLoggedIn,
  UserController.getAssociationForMentorById
);
router.get("/me/mentees", isLoggedIn, UserController.getMenteesForMentor);
router.post("/login", login);
router.post("/forgot-password", UserController.forgotPassword);
router.post("/reset-password", UserController.resetPassword);
router.get("/profile/me", isLoggedIn, UserController.getMyProfile);
router.get("/stats", isLoggedIn, UserController.getStatistics);

/* Admin only routes */
router.post("/mongo/add", isLoggedIn, isAdmin, UserController.addMongoUser);
router.get("/getusers", isLoggedIn, isAdmin, UserController.getMongoUsers);
router.get(
  "/view/get/:type",
  isLoggedIn,
  isAdmin,
  UserController.getViewsUsers
);
router.get(
  "/view/migrate",
  isLoggedIn,
  isAdmin,
  UserController.migrateViewsUsers
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
router.get("/:type", isLoggedIn, isAdmin, UserController.getSpecifiedUsers);

export default router;
