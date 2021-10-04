import { Document } from "mongoose";

export default interface UserInterface extends Document {
  first_name: String;
  last_name: String;
  DOB: Date;
  email: String;
  phone_num: String;
  activity_status: String;
  start_date: Date;
  user_type: String;
}
