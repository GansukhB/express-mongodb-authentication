"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserGroup = exports.User = void 0;
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    avatar: String,
    password: String,
    groups: {
        type: [mongoose_1.Schema.Types.ObjectId],
        default: [],
        ref: "usergroup",
    },
});
const User = (0, mongoose_1.model)("user", userSchema);
exports.User = User;
var Action;
(function (Action) {
    Action["read"] = "read";
    Action["create"] = "create";
    Action["update"] = "update";
    Action["delete"] = "delete";
})(Action || (Action = {}));
const permissionSchema = new mongoose_1.Schema({
    module: { type: String, required: true },
    action: { type: String, required: true },
});
const userGroupSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    permissions: {
        type: [permissionSchema],
        default: [],
    },
});
const UserGroup = (0, mongoose_1.model)("usergroup", userGroupSchema);
exports.UserGroup = UserGroup;
