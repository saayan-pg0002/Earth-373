import { Document } from "mongoose";

export default interface QuestionnaireTemplateInterface extends Document {
    name: String;
}
