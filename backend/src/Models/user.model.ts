import mongoose, { Model, Schema } from "mongoose";
import UserInterface from "../Interfaces/user.interface";

export enum ActivityStatus {
  Active = "Active",
  Inactive = "Inactive",
  TemporarilyWithdrawn = "Temporarily Withdrawn",
  FutureLeaver = "Future Leaver",
  OnHold = "On Hold",
  Withdrawn = "Withdrawn",
  Staff = "Staff",
}

export enum Role {
  Mentor = "Mentor",
  Admin = "Admin",
}

const userSchema: Schema = new Schema(
  {
    views_id: { type: String, required: true },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    phone_number: { type: String, required: false, default: "" },
    activity_status: {
      type: String,
      enum: Object.values(ActivityStatus),
      default: ActivityStatus.Active,
    },
    role: { type: String, enum: Object.values(Role), default: Role.Mentor },
    resetLink: { type: String, default: "", required: false },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model<UserInterface>("User", userSchema);
export default User;
