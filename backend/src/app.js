import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import userRouter from "./routes/user.routes.js";
import businessRouter from './routes/business.routes.js';
import bikerouter from './routes/bike.routes.js'

dotenv.config();

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// Routes Import
app.use("/api/v1/users", userRouter);
app.use('/api/v1/businesses', businessRouter);
app.use('/api/v1/bike',bikerouter);

//https://localhost:3000/api/v1/users/register

export { app };


