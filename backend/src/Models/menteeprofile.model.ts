import mongoose, { Model, Schema } from "mongoose";
import MenteeProfileInterface from "../Interfaces/menteeprofile.interface";

const menteeProfileSchema: Schema = new Schema(
  {
    mentor_id: { type: mongoose.Types.ObjectId, ref: 'User' },
    mentee_name: { type: String, required: true },
    isActive: { type: Boolean, required: true, default: true },
    goals: [{
        id: { type: Number, auto: true },
        name: { type: String, required: true },
        is_complete: { type: Boolean, required: true, default: false}
    }],
    questionnaire_ids: [{ type: mongoose.Types.ObjectId, ref: 'Questionnaire' }]
  },
  {
    timestamps: true,
  }
);

const MenteeProfile = mongoose.model<MenteeProfileInterface>("Mentee Profile", menteeProfileSchema);
export default MenteeProfile;
