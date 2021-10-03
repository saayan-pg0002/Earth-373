import mongoose, { Schema } from "mongoose";
<<<<<<< HEAD
import ISession from "../Interfaces/session.interface";
// todo
const SessionSchema: Schema = new Schema({
  uid: { type: String, required: true },
  mentee_name: { type: String, required: true },
  scheduled_start_time: { type: Date, required: true },
  scheduled_end_time: { type: Date, required: true },
  day_of_the_week: { type: String, required: true },
  mentoring_start_date: { type: Date, default: Date.now() },
});

export default mongoose.model<ISession>("Session", SessionSchema);
=======
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
>>>>>>> 5b335aba9b77dcba5f06715a8721fe57dd6113ed
