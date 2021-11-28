import Router from "express";
import * as SessionController from "../Controllers/session.controller";
const router = Router();

// sessions
router.get(
  "/getAssociatedSessions/:associationID",
  SessionController.getAssociatedSessions
);
router.get("/getSessionByID/:sessionID", SessionController.getSessionByID);
router.get("/getAllSessions", SessionController.getAllSessions);
router.post(
  "/createSessions/:groupID/:associationID",
  SessionController.createSession
);
router.put("/updateSessions/:sessionID", SessionController.updateSessions);

// notes
router.get("/getNotes/:sessionID/:noteID?", SessionController.getNotes);
router.post("/createNotes/:sessionID", SessionController.createNotes);
router.put("/updateNotes/:sessionID", SessionController.updateNotes);

// others
router.get("/getVenues", SessionController.getVenues);
router.get("/getSessionGroups", SessionController.getSessionGroups);

export default router;
