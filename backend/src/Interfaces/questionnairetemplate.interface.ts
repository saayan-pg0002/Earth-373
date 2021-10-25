import { Document } from "mongoose";
import { FieldType } from "../Models/questionnairetemplate.model"

export default interface QuestionnaireTemplateInterface extends Document {
    name: String;
    fields: [{
        id: Number;
        name: String;
        label: String;
        required: Boolean;
        type: FieldType;
        options: String[];
    }];
}
