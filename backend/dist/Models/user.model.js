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
exports.ActivityStatus = void 0;
const mongoose_1 = __importStar(require("mongoose"));
var ActivityStatus;
(function (ActivityStatus) {
    ActivityStatus["Active"] = "Active";
    ActivityStatus["Inactive"] = "Inactive";
    ActivityStatus["TemporarilyWithdrawn"] = "Temporarily Withdrawn";
    ActivityStatus["FutureLeaver"] = "Future Leaver";
    ActivityStatus["OnHold"] = "On Hold";
    ActivityStatus["Withdrawn"] = "Withdrawn";
    ActivityStatus["Staff"] = "Staff";
})(ActivityStatus = exports.ActivityStatus || (exports.ActivityStatus = {}));
const userSchema = new mongoose_1.Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    DOB: { type: Date, required: true },
    email: { type: String, required: true },
    phone_num: { type: String, required: true },
    activity_status: { type: String, enum: Object.values(ActivityStatus), default: ActivityStatus.Active, required: true },
    start_date: { type: Date, required: true, default: Date.now },
    user_type: { type: String, required: true },
}, {
    timestamps: true,
});
const User = mongoose_1.default.model("User", userSchema);
exports.default = User;
