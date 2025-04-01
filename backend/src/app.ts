import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import userRoutes from "./routes/user.route";
dotenv.config();
const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use("/api/users", userRoutes);

export default app;
