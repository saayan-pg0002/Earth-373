"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const schedSchema = new mongoose_1.Schema({
    uid: { type: String, required: true },
    mentee_name: { type: String, required: true },
    scheduled_start_time: { type: Date, required: true },
    scheduled_end_time: { type: Date, required: true },
    day_of_the_week: { type: String, required: true },
    mentoring_start_date: { type: Date, default: Date.now() }
}, {
    timestamps: true
});
const Schedule = mongoose_1.default.model('Schedule', schedSchema);
exports.default = Schedule;
// sample schema & model (ANYTHING BELOW THIS LINE IS NOT PART OF THE PROJECT; IT'S JUST THERE AS REFERENCE.)
const kittySchema = new mongoose_1.Schema({
    name: String,
});
const Kitten = mongoose_1.default.model("Kittens", kittySchema);
// 2 methods to create an object
// Kitten.create({ name: "Kitty1" });
// new Kitten({ name: "Kitty2" }).save();
//2 ways to export:
//export default Kitten;
// module.exports = Kitten;
