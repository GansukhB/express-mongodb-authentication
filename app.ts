import express from "express";
import cors from "cors";
import { userRouter, userGroupRouter } from "./src/routes";
import { checkAuthorization } from "./src/middlewares";

const app = express();

// CORS Policy configuration
app.use(cors());

// Use Express
app.use(express.json());

// Routers
app.use("/user", userRouter);
app.use("/userGroup", checkAuthorization, userGroupRouter);

app.get("/", (req, res) => {
  res.send("SERVICE RUNNING");
});

export default app;
