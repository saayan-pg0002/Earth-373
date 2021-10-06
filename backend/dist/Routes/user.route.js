"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_model_1 = __importDefault(require("../Models/user.model"));
const user_controller_1 = __importDefault(require("../Controllers/user.controller"));
const router = express_1.default.Router();
router.route("/").get((req, res) => {
    user_model_1.default.find()
        .then((user) => res.json(user))
        .catch((err) => res.status(400).json("Error: " + err));
});
router.route("/add/mongo").post(user_controller_1.default.addUser);
router.route("/getuser").get(user_controller_1.default.getUsers);
router.route("/view/get/:type").get(user_controller_1.default.getViewUsers);
router.route("/view/add/:type").post(user_controller_1.default.createViewUser);
router.route("/demo").get(user_controller_1.default.foo);
exports.default = router;
