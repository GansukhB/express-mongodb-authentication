import mongoose from "mongoose";
import dotenv from "dotenv";
import app from "./app";

dotenv.config();

const port = process.env.PORT || 3000;
const uri: string =
  process.env.MONGODB_URL || "mongodb://localhost:27017/nest_hr";

console.log(uri);
mongoose.connect(uri);

const { connection } = mongoose;

connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
