import express, { Request, Response, Router } from "express";
import User from "../Models/user.model";
import UserController from "../Controllers/user.controller";

const router: Router = express.Router();

router.route("/").get((req: Request, res: Response) => {
  User.find()
    .then((user) => res.json(user))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add/mongo").post(UserController.addUser);
router.route("/getuser").get(UserController.getUsers);
router.route("/view/get/:type").get(UserController.getViewUsers);
router.route("/view/add/:type").post(UserController.createViewUser);

export default router;
