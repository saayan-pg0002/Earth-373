import express, { Router } from "express";
import { isLoggedIn, isAdmin, login } from "../Middleware/middleWare";
import QuestionnaireController from "../Controllers/questionnaire.controller";

const router: Router = express.Router();

//commented for testing purpose, to skip authorization
// router
//   .route("/view/migrate/qt")
//   .get(isLoggedIn, isAdmin, QuestionnaireController.migrateQuestionnarie);

//for developing and testing purpose only
router.route("/view/migrate").get(QuestionnaireController.migrateQuestionnarie);

export default router;
