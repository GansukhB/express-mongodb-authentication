"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const movieRouter_1 = __importDefault(require("./routes/movieRouter"));
const app = (0, express_1.default)();
// CORS Policy configuration
app.use((0, cors_1.default)());
// Use Express
app.use(express_1.default.json());
// Routers
app.use(movieRouter_1.default);
app.get("/", (req, res) => {
    res.send("SERVICE RUNNING");
});
exports.default = app;
