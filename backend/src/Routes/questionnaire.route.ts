import express, { Router } from "express";
import { isLoggedIn, isAdmin, login } from "../Middleware/middleWare";
import QuestionnaireController from "../Controllers/questionnairetemplate.controller";

const router: Router = express.Router();

//Admin only endpoint to migrate Questionnaire
router
  .route("/migrate-questionnaires")
  .get(
    isLoggedIn,
    isAdmin,
    QuestionnaireController.migrateQuestionnarieTemplate
  );

router
  .route("/associations/:assid/assign-questionnaire/:tempid")
  .post(QuestionnaireController.assignQuestionnaireToAssociation);

router
  .route("/associations/questionnaire/:id")
  .put(QuestionnaireController.updateQuestionnaireValues);

export default router;
