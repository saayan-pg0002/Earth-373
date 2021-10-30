import mongoose, { Document } from "mongoose";

export default interface MenteeProfileInterface extends Document {
    mentor_id: mongoose.Types.ObjectId;
    mentee_name: String;
    isActive: Boolean;
    goals: [{
        id: Number;
        name: String;
        is_complete: Boolean;
    }],
    questionnaire_ids: [mongoose.Types.ObjectId];
}
