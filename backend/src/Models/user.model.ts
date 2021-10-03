import mongoose, { Schema } from "mongoose";
import IUser from "../Interfaces/user.interface";
// todo
const userSchema: Schema = new Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  DOB: { type: Date, required: true },
  email: { type: String, required: true },
  phone_num: { type: String, required: true },
  activity_status: { type: String, required: true },
  start_date: { type: Date, required: true, default: Date.now },
  user_type: { type: String, required: true },
});

export default mongoose.model<IUser>("User", userSchema);
