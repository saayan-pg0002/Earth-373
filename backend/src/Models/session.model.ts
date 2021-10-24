import mongoose, { Schema } from "mongoose";
import SessionInterface from "../Interfaces/session.interface";

const sessionSchema: Schema = new Schema(
  {
    mentee_profile_id: { type: mongoose.Schema.Types.ObjectId, required: true },
    start_time: { type: Date, required: true },
    end_time: { type: Date, required: true },
    is_cancelled: { type: Boolean, required: true, default: false },
    notes: { type: String, default: "" },
  },
  {
    timestamps: true,
  }
);

const Session = mongoose.model<SessionInterface>("Session", sessionSchema);
export default Session;
