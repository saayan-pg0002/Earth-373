import { Document } from "mongoose";

export default interface MenteeInterface extends Document {
    mentor_id: String;
    mentee_name: String;
    isActive: Boolean;
    questionnaire_ids: String[];
}
