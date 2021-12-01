import mongoose, { Document } from "mongoose";

export default interface QuestionnaireInterface extends Document {
  mentor_views_id: String;
  questionnaire_template_views_id: String;
  questionnaire_views_id: String;
}
