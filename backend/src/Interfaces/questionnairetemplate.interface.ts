import { Document } from "mongoose";
import { FieldType } from "../Models/questionnairetemplate.model"

export default interface QuestionnaireTemplateInterface extends Document {
    name: String;
    fields: [{
        id: Number;
        name: String;
        label: String;
        is_required: Boolean;
        field_type: FieldType;
        options: String[];
    }];
}
