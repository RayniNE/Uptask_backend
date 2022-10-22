import express from "express";
import dotenv from "dotenv";

import connectDB from "./config/db.js";
import userRouter from "./routes/user.js";
import projectRouter from "./routes/project.js";

// Get all the envs loaded.
dotenv.config();
// Connect to mongoDB.
connectDB();

// Create the express app.
const app = express();

// Allow reading of json payload.
app.use(express.json());

// Start routing the different endpoints.
app.use("/api/user", userRouter);
app.use("/api/project", projectRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started at port: ${PORT}`);
});
