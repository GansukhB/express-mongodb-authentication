"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const app_1 = __importDefault(require("./app"));
dotenv_1.default.config();
const port = process.env.PORT || 3000;
const uri = process.env.MONGODB_URL || "mongodb://localhost:27017/nest_hr";
console.log(uri);
mongoose_1.default.connect(uri);
const { connection } = mongoose_1.default;
connection.once("open", () => {
    console.log("MongoDB database connection established successfully");
});
app_1.default.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
