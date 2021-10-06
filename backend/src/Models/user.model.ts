import mongoose, { Schema } from "mongoose";
import UserInterface from "../Interfaces/user.interface";

export enum ActivityStatus {
  Active = 'Active',
  Inactive = 'Inactive',
  TemporarilyWithdrawn = 'Temporarily Withdrawn',
  FutureLeaver = 'Future Leaver',
  OnHold = 'On Hold',
  Withdrawn = 'Withdrawn',
  Staff = 'Staff'
}

const userSchema: Schema = new Schema(
  {
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    DOB: { type: Date, required: true },
    email: { type: String, required: true },
    phone_num: { type: String, required: true },
    activity_status: { type: String, enum: Object.values(ActivityStatus), default: ActivityStatus.Active, required: true },
    start_date: { type: Date, required: true, default: Date.now },
    user_type: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model<UserInterface>("User", userSchema);
export default User;
