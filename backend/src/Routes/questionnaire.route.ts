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
    QuestionnaireController.migrateQuestionnaireTemplate
  );
router
  .route("/all-questionnaires")
  .get(isLoggedIn, QuestionnaireController.getQuestionnaireTemplateList);
router
  .route("/questionnaire-template/:id")
  .get(isLoggedIn, QuestionnaireController.getQuestionnaireTemplateById);
export default router;
