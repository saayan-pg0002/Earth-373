import mongoose, { Document } from "mongoose";

export default interface AssociationInterface extends Document {
  mentor_id: mongoose.Types.ObjectId;
  mentee_id: mongoose.Types.ObjectId;
  start_date: Date;
  end_date: Date;
  isActive: Boolean;
  goals: [
    {
      name: String;
      created_at: Date;
      updated_at: Date;
      is_complete: Boolean;
      completed_at: Date;
    }
  ];
  questionnaire_id: String;
}
