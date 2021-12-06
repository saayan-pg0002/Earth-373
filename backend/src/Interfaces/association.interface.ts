import mongoose, { Document } from "mongoose";

export default interface AssociationInterface extends Document {
  mentor_id: String;
  mentee_id: String;
  start_date: Date;
  end_date: Date;
  isActive: Boolean;
  goals: [
    {
      goal_name: String;
      created_at: Date;
      updated_at: Date;
      is_complete: Boolean;
      completed_at: Date;
    }
  ];
  current_questionnaire_id: String;
  previous_questionnaire_ids: [String];
}
