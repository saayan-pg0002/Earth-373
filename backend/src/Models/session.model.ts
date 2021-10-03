import mongoose, { Schema } from "mongoose";
import SessionInterface from "../Interfaces/session.interface"

const sessionSchema: Schema = new Schema({
    clock_in_time: { type: Date, default: null },
    clock_out_time: { type: Date, default: null },
    notes: { type: String, default: "" }
}, {
    timestamps: true
})

const Session = mongoose.model<SessionInterface>('Session', sessionSchema)
export default Session