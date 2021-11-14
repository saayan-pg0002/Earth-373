import Router from "express";
import * as SessionController from "../Controllers/session.controller";

const router = Router();

router.route("/get/:groupID?/:sessionID?").get(SessionController.getSessions);
router.route("/create/:groupID").post(SessionController.createSessions);
router.route("/notes/:method/:id").post(SessionController.requestNotes);
router.route("/attendees/:sessionID/:type").get(SessionController.getAttendees);

export default router;
