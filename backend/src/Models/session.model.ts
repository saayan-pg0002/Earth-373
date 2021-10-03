import mongoose, { Schema } from "mongoose";
import ISession from "../Interfaces/session.interface";
// todo
const SessionSchema: Schema = new Schema({
  uid: { type: String, required: true },
  mentee_name: { type: String, required: true },
  scheduled_start_time: { type: Date, required: true },
  scheduled_end_time: { type: Date, required: true },
  day_of_the_week: { type: String, required: true },
  mentoring_start_date: { type: Date, default: Date.now() },
});

export default mongoose.model<ISession>("Session", SessionSchema);
