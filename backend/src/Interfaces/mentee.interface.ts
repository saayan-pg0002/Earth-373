import { Document } from "mongoose";

export default interface MenteeInterface extends Document {
  views_id: Number;
  first_name: String;
  last_name: String;
  age: Number;
  dateOfBirth: Date;
}
