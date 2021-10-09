import { Document } from "mongoose";
import { ActivityStatus, UserType } from "../Models/user.model";

export default interface UserInterface extends Document {
  views_id: Number;
  first_name: String;
  last_name: String;
  email: String;
  password: String;
  activity_status: ActivityStatus;
  user_type: UserType;
}
