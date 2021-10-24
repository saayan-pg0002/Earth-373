import mongoose, { Document } from "mongoose";

export default interface SessionInterface extends Document {
  mentee_profile_id: mongoose.Schema.Types.ObjectId;
  start_time: Date;
  end_time: Date;
  is_cancelled: Boolean;
  notes: String;
}
