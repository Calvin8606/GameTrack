import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import userRoutes from "./routes/user.route";
import projectRoutes from "./routes/project.route";
dotenv.config();
const app = express();

app.use(
  cors({
    origin: ["https://gametrack.dev", "http://localhost:3000"],
    credentials: true,
  }),
);
app.use(bodyParser.json());

app.use("/api/users", userRoutes);
app.use("/api/projects", projectRoutes);

export default app;
