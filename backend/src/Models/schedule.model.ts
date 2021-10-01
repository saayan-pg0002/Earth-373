import mongoose, { Model, Schema } from "mongoose";
import ScheduleInterface from "../Interfaces/schedule.interface";

const schedSchema: Schema = new Schema({
  uid: { type: String, required: true },
  mentee_name: { type: String, required: true },
  scheduled_start_time: { type: Date, required: true },
  scheduled_end_time: { type: Date, required: true },
  day_of_the_week: { type: String, required: true },
  mentoring_start_date: { type: Date, default: Date.now() }
})

const Schedule = mongoose.model<ScheduleInterface>('Schedule', schedSchema)
export default Schedule





// sample schema & model (ANYTHING BELOW THIS LINE IS NOT PART OF THE PROJECT; IT'S JUST THERE AS REFERENCE.)

const kittySchema: Schema = new Schema({
  name: String,
});

const Kitten = mongoose.model("Kittens", kittySchema);

// 2 methods to create an object
// Kitten.create({ name: "Kitty1" });
// new Kitten({ name: "Kitty2" }).save();

//2 ways to export:
//export default Kitten;
// module.exports = Kitten;


