import mongoose, { Model, Schema } from "mongoose";
import MenteeMentorAssociationInterface from "../Interfaces/menteementorassociation.interface";

const menteeMentorAssociationSchema: Schema = new Schema(
  {
    mentor_views_id: { type: String, ref: 'User', required: true},
    mentee_views_id: { type: String, ref: 'Mentee', required: true },
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

const MenteeMentorAssociation = mongoose.model<MenteeMentorAssociationInterface>("Mentee Mentor Association", menteeMentorAssociationSchema);
export default MenteeMentorAssociation;
