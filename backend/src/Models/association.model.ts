import mongoose, { Schema } from "mongoose";
import AssociationInterface from "../Interfaces/association.interface";

const associationSchema: Schema = new Schema(
  {
    mentor_id: { type: String, ref: "User", required: true },
    mentee_id: { type: String, ref: "Mentee", required: true },
    start_date: { type: Date, required: false, default: "" },
    end_date: { type: Date, required: false, default: "" },
    isActive: { type: Boolean, required: true, default: true },
    goals: [
      {
        goal_name: { type: String, required: true },
        created_at: { type: Date, required: true },
        updated_at: { type: Date, required: true },
        is_complete: { type: Boolean, required: true, default: false },
        completed_at: { type: Date, required: false, default: "" }
      }
    ],
    current_questionnaire_id: { type: String, default: "none" },
    previous_questionnaire_ids: [{ type: String }]
  },
  {
    timestamps: true
  }
);

const Association = mongoose.model<AssociationInterface>(
  "Association",
  associationSchema
);
export default Association;
