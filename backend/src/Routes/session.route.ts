import Router from "express";
import * as SessionController from "../Controllers/session.controller";
import { isAdmin, isUser } from "../Middleware/middle.ware";

const router = Router();

// sessions
router.route("/get/:groupID?/:sessionID?").get(SessionController.getSessions);
router.route("/create/:groupID").post(SessionController.createSessions);
router.route("/update/:sessionID").put(SessionController.updateSessions);

// notes
router.route("/notes/:sessionID/:noteID?").get(SessionController.getNotes);
router.route("/notes/:sessionID").post(SessionController.createNotes);
router.route("/notes/:sessionID/:noteID").put(SessionController.updateNotes);

// attendance
router.route("/attendees/:sessionID/:type").get(SessionController.getAttendees);

// TODO
// router.route("/migrate").get(SessionController.migrateSessions);

export default router;
