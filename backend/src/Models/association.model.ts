import mongoose, { Model, Schema } from "mongoose";
import AssociationInterface from "../Interfaces/association.interface";

const associationSchema: Schema = new Schema(
  {
    mentor_id: { type: String, ref: 'User', required: true},
    mentee_id: { type: String, ref: 'Mentee', required: true },
    isActive: { type: Boolean, required: true, default: true },
    goals: [{
        name: { type: String, required: true },
        is_complete: { type: Boolean, required: true, default: false}
    }],
    questionnaire_ids: [{ type: mongoose.Types.ObjectId, ref: 'Questionnaire' }]
  },
  {
    timestamps: true,
  }
);

const Association = mongoose.model<AssociationInterface>("Mentee Mentor Association", associationSchema);
export default Association;
