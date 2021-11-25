import mongoose, { Document } from "mongoose";

export default interface SessionInterface extends Document {
  association_id: mongoose.Types.ObjectId;
  start_time: Date;
  end_time: Date;
  is_cancelled: Boolean;
  notes: String;
}
