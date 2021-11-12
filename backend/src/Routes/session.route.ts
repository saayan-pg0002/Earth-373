import Router from "express";
import SessionController from "../Controllers/session.controller";

const router = Router();

router.route("/get/:groupID?/:sessionID?").get(SessionController.getSessions);
router.route("/create").post(SessionController.createSessions);
router.route("/notes/:method/:id").post(SessionController.requestNotes);

export default router;
