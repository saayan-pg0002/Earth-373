import mongoose, { Model, Schema } from "mongoose";
import QuestionnaireTemplateInterface from "../Interfaces/questionnairetemplate.interface";

export enum FieldType {
    Text = 'Text',
    TextArea = 'TextArea',
    Checkbox = 'Checkbox',
    CheckboxGroup = 'Checkbox Group',
    Radio = 'Radio',
    RadioGroup = 'Radio Group',
    Select = 'Select'
}

const questionnaireTemplateSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    fields: [{
        id: { type: Number, required: true, auto: true },
        name: { type: String, required: true },
        label: { type: String, required: true },
        required: { type: Boolean, required: true, default: false },
        type: { type: String, enum: Object.values(FieldType), required: true, default: FieldType.Text},
        options: [String]
    }]
  },
  {
    timestamps: true,
  }
);

const QuestionnaireTemplate = mongoose.model<QuestionnaireTemplateInterface>("Questionnaire Template", questionnaireTemplateSchema);
export default QuestionnaireTemplate;
