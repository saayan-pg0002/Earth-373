import mongoose, { Model, Schema } from "mongoose";
import QuestionnaireInterface from "../Interfaces/questionnaire.interface";

const questionnaireSchema: Schema = new Schema(
  {
    mentor_views_id: { type: String, required: true },
    questionnaire_template_views_id: { type: String, required: true },
    questionnaire_views_id: { type: String }
  },
  {
    timestamps: true
  }
);

const Questionnaire = mongoose.model<QuestionnaireInterface>(
  "Questionnaire",
  questionnaireSchema
);
export default Questionnaire;
