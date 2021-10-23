import mongoose, { Model, Schema } from "mongoose";
import MenteeInterface from "../Interfaces/mentee.interface";

const menteeSchema: Schema = new Schema(
  {
    mentor_id: {type: String, required: true},
    mentee_name: { type: String, required: true },
    isActive: { type: Boolean, required: true, default: true },
    goals: [{
        id: { type: Number, auto: true },
        name: { type: String, required: true },
        is_complete: { type: Boolean, required: true, default: false}
    }],
    questionnaire_ids: [String]
  },
  {
    timestamps: true,
  }
);

const Mentee = mongoose.model<MenteeInterface>("Mentee", menteeSchema);
export default Mentee;
