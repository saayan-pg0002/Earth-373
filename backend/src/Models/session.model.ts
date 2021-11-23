import mongoose, { Schema } from "mongoose";
import SessionInterface from "../Interfaces/session.interface";

const sessionSchema: Schema = new Schema(
  {
    views_id: { type: String, required: true },
    views_group_id: { type: String, required: true },
    association_id: {
      type: mongoose.Types.ObjectId,
      ref: "Association",
      required: true,
    },
    start_time: { type: Date },
    end_time: { type: Date },
    is_cancelled: { type: Boolean, required: true, default: false },
    notes: [
      {
        views_id: { type: String, required: true },
        description: { type: String, required: true, default: "" },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Session = mongoose.model<SessionInterface>("Session", sessionSchema);
export default Session;
