import express, { Request, Response, Router } from "express";
import User from "../Models/user.model";
import UserController from "../Controllers/user.controller";
import passportConfig from "../Middleware/middleWare";
import passport from "passport";

const router: Router = express.Router();

router.route("/").get((req: Request, res: Response) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post(UserController.addUser);
router.route("/getuser").get(UserController.getUsers);

router.route("/view/get/:type").get(UserController.getViewUsers);
router.route("/migrateusers").get(UserController.migrateUsers);
router.route("/migratementees").get(UserController.migrateMentees);
router
  .route("/validate")
  .get(passportConfig.authenticate, UserController.validateToken);
router.route("/register").post(UserController.register);

router.route("/me/goal").post(UserController.createGoalForAssociation);
router.route("/me/association/:id").get(UserController.getAssociationById);
router.route("/me/association/:id").patch(UserController.updateAssociationById);

router
  .route("/login")
  .post(passport.authenticate("signIn"), passportConfig.signJWT);

router.route("/me").get(passportConfig.authenticate, UserController.getProfile);
router
  .route("/me/patch")
  .patch(passportConfig.authenticate, UserController.updateProfile);

export default router;
