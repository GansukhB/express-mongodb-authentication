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
exports.loginUser = exports.createUser = exports.listGroup = exports.createGroup = void 0;
const models_1 = require("./models");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield models_1.User.create(req.body);
    res.status(201).send({
        message: "Created user",
        data: {
            user: user,
        },
    });
});
exports.createUser = createUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const user = yield models_1.User.findOne({ email, password }).lean();
    console.log(user);
    if (user) {
        const token = jsonwebtoken_1.default.sign({
            userId: user._id.toString(),
        }, process.env.JWT_SECRET || "secret", {
            expiresIn: "24h",
        });
        console.log(token);
        res.status(200).send({
            message: "Logged in",
            data: { token },
        });
        return;
    }
    res.status(401).send({
        message: "Invalid login",
    });
});
exports.loginUser = loginUser;
const createGroup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const group = yield models_1.UserGroup.create(req.body);
    res.status(201).send({
        message: "Created user group",
        data: {
            userGroup: group,
        },
    });
});
exports.createGroup = createGroup;
const listGroup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const groups = yield models_1.UserGroup.find();
    res.status(200).send({
        data: {
            userGroups: groups,
        },
    });
});
exports.listGroup = listGroup;
