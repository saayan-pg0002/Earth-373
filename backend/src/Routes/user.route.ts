import express, { Request, Response, Router } from "express";
import User from "../Models/user.model";
import UserController from "../Controllers/user.controller";
import extractJWT from "../middleware/extractJWT";

const router: Router = express.Router();

router.route("/").get((req: Request, res: Response) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post(UserController.addUser);
router.route("/getuser").get(UserController.getUsers);

router.route("/view").get(UserController.getViewUsers);


router.route("/validate").get(extractJWT, UserController.validateToken);
router.route("/register").post(UserController.register);
router.route("/login").post(UserController.login);


export default router;
