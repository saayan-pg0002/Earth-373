import mongoose, { Model, Schema } from "mongoose";
import UserInterface from "../Interfaces/user.interface";

export enum ActivityStatus {
  Active = 'Active',
  Inactive = 'Inactive',
  Suspended = 'Suspended'
}

export enum UserType {
    Mentor = 'Mentor',
    IntoSchoolMentor = 'Into School Mentor',
    WomanMentor = 'Woman Mentor',
    YoungMentor = 'Young Mentor',
    Admin = 'Admin'
}

const userSchema: Schema = new Schema(
  {
    views_id: { type: Number, required: true },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true },
    password: {type: String, required: true},    
    activity_status: { type: String, enum: Object.values(ActivityStatus), default: ActivityStatus.Active },
    user_type: { type: String, enum: Object.values(UserType), default: UserType.Mentor },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model<UserInterface>("User", userSchema);
export default User;
