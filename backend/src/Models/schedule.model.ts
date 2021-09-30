import mongoose, { Model, Schema } from "mongoose";

// sample schema & model

const kittySchema: Schema = new Schema({
  name: String,
});

const Kitten = mongoose.model("Kittens", kittySchema);

// 2 methods to create an object
// Kitten.create({ name: "Kitty1" });
// new Kitten({ name: "Kitty2" }).save();

export default Kitten;
// module.exports = Kitten;
