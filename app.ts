import express from "express";
import cors from "cors";
import movieRouter from "./routes/movieRouter";

const app = express();

// CORS Policy configuration
app.use(cors());

// Use Express
app.use(express.json());

// Routers
app.use(movieRouter);

app.get("/", (req, res) => {
  res.send("SERVICE RUNNING");
});

export default app;
