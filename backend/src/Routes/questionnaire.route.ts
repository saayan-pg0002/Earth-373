import express, { Router } from "express";
import { isLoggedIn, isAdmin, login } from "../Middleware/middleWare";
import QuestionnaireController from "../Controllers/questionnairetemplate.controller";

const router: Router = express.Router();

//Admin only endpoint to migrate Questionnaire
router
  .route("/migrate-questionnaires")
  .get(isLoggedIn, isAdmin, QuestionnaireController.migrateQuestionnarie);

//for developing and testing purpose only
// router
//   .route("/migrate-questionnaires")
//   .get(QuestionnaireController.migrateQuestionnarie);

export default router;
