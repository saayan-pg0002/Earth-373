import express, { Router } from "express";
import UserController from "../Controllers/user.controller";
import * as middleware from "../Middleware/middleWare";

const router: Router = express.Router();

router.post("/mongo/add", UserController.addMongoUser);
router.get("/getusers", middleware.isAdmin, UserController.getMongoUsers);
router.get("/view/get/:type", UserController.getViewUsers);
router.get("/view/migrate", UserController.migrateViewUsers);
router.post("/me/association/goals", UserController.getGoalsForAssociation);
router.post("/creategoal", UserController.createGoalForAssociation);
router.get("/me/associations", UserController.getAssociationsFromMentor);
router.post("/create-association", UserController.createAssociation);
router.post("/login", middleware.login);
router.post("/forgot-password", UserController.forgotPassword);
router.post("/reset-password", UserController.resetPassword);
router.get("/profile/me", UserController.getMyProfile);

/* Admin only routes */
router.put("/profile/edit/:id", UserController.editProfile);
router.get("/get/:type", UserController.getUsers);
// middleware.isLoggedIn,
//   middleware.isAdmin,
export default router;
