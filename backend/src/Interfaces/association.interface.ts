import mongoose, { Document } from "mongoose";

export default interface AssociationInterface extends Document {
    mentor_id: String;
    mentee_id: String;
    isActive: Boolean;
    goals: [{
        name: String;
        is_complete: Boolean;
    }];
    questionnaire_ids: [mongoose.Types.ObjectId];
}
