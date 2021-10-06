"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = __importDefault(require("../Models/user.model"));
const axios_1 = __importDefault(require("axios"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
dotenv_1.default.config();
const addUser = (req, res, next) => {
    let { first_name, last_name, DOB, email, phone_num, activity_status, start_date, user_type, } = req.body;
    const user = new user_model_1.default({
        _id: new mongoose_1.default.Types.ObjectId(),
        first_name,
        last_name,
        DOB,
        email,
        phone_num,
        activity_status,
        start_date,
        user_type,
    });
    return user
        .save()
        .then((result) => {
        return res.status(201).json({
            user: result,
        });
    })
        .catch((error) => {
        return res.status(500).json({
            message: error.message,
            error,
        });
    });
};
const getUsers = (req, res, next) => {
    user_model_1.default.find()
        .exec()
        .then((users) => {
        return res.status(200).json({
            users: users,
            count: users.length,
        });
    })
        .catch((error) => {
        return res.status(500).json({
            message: error.message,
            error,
        });
    });
};
const getViewUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const type = req.params.type;
    let url = "https://app.viewsapp.net/api/restful/contacts/" + type + "/search?q=a";
    (0, axios_1.default)({
        method: "get",
        url: url,
        auth: {
            username: process.env.VIEW_USERNAME,
            password: process.env.VIEW_PASSWORD,
        },
    })
        .then((response) => {
        res.send(response.data);
    })
        .catch((error) => {
        console.log(error);
        res.send(error);
    });
});
const createViewUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { fname, lname, dob, estimated_dob, address1, postcode, mobile, personID, emergency_fname, emergency_lname, emergency_mobile, relationship, special_needs, nationality, first_language, ethnicity, } = req.body;
    const newUser = {
        Forename: fname,
        Surname: lname,
        DateOfBirth: dob,
        Estimated_P_217: estimated_dob,
        Address1: address1,
        Postcode: postcode,
        Mobile: mobile,
        PersonID: personID,
        EmergencyContact1FirstName_P_206: emergency_fname,
        EmergencyContact1LastName_P_207: emergency_lname,
        Telnomobile_P_47: emergency_mobile,
        Relationship_P_44: relationship,
        Specificrequirementsrelevanttoaccessingourservice_P_230: special_needs,
        Nationality_P_86: nationality,
        FirstLanguage_P_88: first_language,
        Ethnicity: ethnicity,
    };
    const type = req.params.type;
    let url = "https://app.viewsapp.net/api/restful/contacts/" + type;
    (0, axios_1.default)({
        method: "post",
        url: url,
        auth: {
            username: process.env.VIEW_USERNAME,
            password: process.env.VIEW_PASSWORD,
        },
        data: newUser,
    })
        .then((response) => {
        res.send(response.data);
    })
        .catch((error) => {
        console.log(error);
        res.send(error);
    });
});
function foo(json) {
    const test = {
        cheese: "blue",
    };
    console.log(arguments[0]);
    return new Response();
    // console.log(JSON.stringify(data));
    // console.log(JSON.stringify({ x: "ASDA", y: "ASD" }));
}
exports.default = {
    addUser,
    getUsers,
    getViewUsers,
    createViewUser,
    foo,
};
