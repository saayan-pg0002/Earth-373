import mongoose, { Model, Schema } from "mongoose";
import QuestionnaireInterface from "../Interfaces/questionnaire.interface";

const questionnaireSchema: Schema = new Schema(
  {
    mentor_views_id: { type: String, required: true },
    questionnaire_template_views_id: { type: String, required: true },
    questionnaire_views_id: { type: String, required: true },
    values: [
      {
        field_id: { type: Number, required: true },
        value: { type: String, required: true, default: "" }
      }
    ]
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
