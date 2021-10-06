"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const user_route_1 = __importDefault(require("./Routes/user.route"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const URI = process.env.MONGO_URI;
const URI_LOCAL = process.env.MONGO_URI_LOCAL;
mongoose_1.default.connect(URI_LOCAL).then(() => {
    console.log("Mongodb is connected... ");
});
const port = process.env.PORT || 5000;
/** Rules of our API */
app.use(express_1.default.json());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    if (req.method == "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
        return res.status(200).json({});
    }
    next();
});
/** Routes go here */
app.use("/users", user_route_1.default);
/** Error Handling */
app.use((req, res, next) => {
    const error = new Error("Not found");
    res.status(404).json({
        message: error.message,
    });
});
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
exports.default = app;
