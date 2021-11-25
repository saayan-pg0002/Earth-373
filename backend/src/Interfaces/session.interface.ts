import mongoose, { Document } from "mongoose";

export default interface SessionInterface extends Document {
  views_id: String;
  views_group_id: String;
  association_id: mongoose.Types.ObjectId;
  start_time: Date;
  end_time: Date;
  is_cancelled: Boolean;
  notes: {
    views_id: String;
    description: String;
  };
}
