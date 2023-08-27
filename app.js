import express from "express";
import userRoutes from "./routes/user.js";
import taskRouter from "./routes/task.js";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middlewares/error.js";
import cors from "cors";

config({
  path: "./data/config.env",
});

//Create our main app
export const app = express();

//Using middleware
app.use(express.json()); //We are accept only json file to store it our database.
app.use(cookieParser());
app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

//Using Routes
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/tasks", taskRouter);

//Get request
app.get("/", (req, res) => {
  res.send("Working fine");
});

//Using error Middleware
app.use(errorMiddleware);
