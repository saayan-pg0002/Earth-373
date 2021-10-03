import {Document} from 'mongoose'

export default interface SessionInterface extends Document {
    clock_in_time: Date,
    clock_out_time: Date,
    notes: String,
}