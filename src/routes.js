"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userGroupRouter = exports.userRouter = void 0;
const express_1 = require("express");
const controllers_1 = require("./controllers");
const middlewares_1 = require("./middlewares");
const userRouter = (0, express_1.Router)();
exports.userRouter = userRouter;
userRouter.post("/create", controllers_1.createUser);
userRouter.post("/login", controllers_1.loginUser);
const userGroupRouter = (0, express_1.Router)();
exports.userGroupRouter = userGroupRouter;
userGroupRouter.post("/create", (0, middlewares_1.checkPermission)("userGroup", "create"), controllers_1.createGroup);
userGroupRouter.get("/list", (0, middlewares_1.checkPermission)("userGroup", "read"), controllers_1.listGroup);
