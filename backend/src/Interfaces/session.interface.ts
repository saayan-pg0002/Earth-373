import { Document } from "mongoose";

export default interface Session extends Document {
  title: string;
  author: string;
}
