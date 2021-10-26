import mongoose, { Document } from "mongoose";

export default interface MenteeInterface extends Document {
    mentor_id: mongoose.Types.ObjectId;
    mentee_name: String;
    isActive: Boolean;
    questionnaire_ids: String[];
}
