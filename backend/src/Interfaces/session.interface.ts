import { Document } from "mongoose";

export default interface SessionInterface extends Document {
  mentee_profile_id: String;
  start_time: Date;
  end_time: Date;
  notes: String;
}
