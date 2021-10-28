import express, { Request, Response, Router } from "express";
import Mentee from "../Models/mentee.model";
import MenteeController from "../Controllers/mentee.controller";

const router: Router = express.Router();

router.route("/").get((req: Request, res: Response) => {
  Mentee.find()
    .then((mentees) => res.json(mentees))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/migratementees").get(MenteeController.createMenteesFromViews);

export default router;
