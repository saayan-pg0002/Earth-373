import mongoose, { Schema } from "mongoose";

const sessionSchema: Schema = new Schema({
    clock_in_time: { type: Date, default: null },
    clock_out_time: { type: Date, default: null },
    notes: { type: String, default: "" }
})

const Session = mongoose.model('Session', sessionSchema)
export default Session