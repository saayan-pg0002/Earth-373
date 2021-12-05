import { Document } from "mongoose";
import { FieldType } from "../Models/questionnairetemplate.model";

export default interface QuestionnaireTemplateInterface extends Document {
  name: String;
  views_id: Number;
  fields: [
    {
      views_id: Number;
      label: String;
      is_required: Boolean;
      field_type: FieldType;
      validation: String[];
      options: String[];
    }
  ];
}
