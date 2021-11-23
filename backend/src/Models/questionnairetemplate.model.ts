import mongoose, { Model, Schema } from "mongoose";
import QuestionnaireTemplateInterface from "../Interfaces/questionnairetemplate.interface";

export enum FieldType {
  Text = "text",
  TextArea = "textarea",
  Checkbox = "checkbox",
  CheckboxGroup = "checkboxgroup",
  Radio = "radio",
  RadioGroup = "radiogroup",
  Select = "select",
}

const questionnaireTemplateSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    id: { type: Number, required: true },
    fields: [
      {
        id: { type: Number, required: true, auto: true },
        label: { type: String, required: true },
        is_required: { type: Boolean, required: true, default: false },
        field_type: {
          type: String,
          enum: Object.values(FieldType),
          required: true,
          default: FieldType.Text,
        },
        options: [String],
      },
    ],
  },
  {
    timestamps: true,
  }
);

const QuestionnaireTemplate = mongoose.model<QuestionnaireTemplateInterface>(
  "Questionnaire Template",
  questionnaireTemplateSchema
);
export default QuestionnaireTemplate;
