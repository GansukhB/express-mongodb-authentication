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
exports.checkPermission = exports.checkAuthorization = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const models_1 = require("./models");
const checkAuthorization = (req, res, next) => {
    var _a;
    const token = ((_a = req.headers) === null || _a === void 0 ? void 0 : _a.authorization) || "";
    jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || "secret", function async(err, decoded) {
        const { userId } = decoded || "";
        res.locals.userId = userId;
        if (err) {
            res.status(401).send({
                message: "Invalid credential",
            });
            return;
        }
        next();
    });
};
exports.checkAuthorization = checkAuthorization;
const checkPermission = (module, action) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield models_1.User.findById(res.locals.userId)
            .populate("groups")
            .populate("groups.permissions");
        const userGroups = user === null || user === void 0 ? void 0 : user.groups;
        var permitted = false;
        userGroups === null || userGroups === void 0 ? void 0 : userGroups.forEach((userGroup) => {
            userGroup === null || userGroup === void 0 ? void 0 : userGroup.permissions.forEach((permission) => __awaiter(void 0, void 0, void 0, function* () {
                console.log(permission.module, permission.action);
                if (module === permission.module && action === permission.action) {
                    permitted = true;
                    return;
                }
            }));
        });
        if (!permitted)
            return res.status(403).send({
                message: "Permission denied",
            });
        next();
    });
};
exports.checkPermission = checkPermission;
