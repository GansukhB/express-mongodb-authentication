"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = require("./src/routes");
const middlewares_1 = require("./src/middlewares");
const app = (0, express_1.default)();
// CORS Policy configuration
app.use((0, cors_1.default)());
// Use Express
app.use(express_1.default.json());
// Routers
app.use("/user", routes_1.userRouter);
app.use("/userGroup", middlewares_1.checkAuthorization, routes_1.userGroupRouter);
app.get("/", (req, res) => {
    res.send("SERVICE RUNNING");
});
exports.default = app;
