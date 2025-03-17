import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRouter from "./routes/userRouter.js";
import jobRouter from "./routes/jobRouter.js";
import adminRouter from "./routes/adminRouter.js";
import applicationRoutes from "./routes/applicationRouter.js";
import { dbConnection } from "./database/dbConnection.js";
import { errorMiddleware } from "./middlewares/error.js";
import fileUpload from "express-fileupload";
import visitRoutes from "./routes/visitRoutes.js";

const app = express();

// Load environment variables
dotenv.config({ path: "./config/config.env" });

// ✅ Updated CORS Configuration
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "https://jobsphere-frontend.onrender.com",
    credentials: true, // Allow cookies
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Middleware
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  fileUpload({
    useTempFiles: true, // Required for Cloudinary
    tempFileDir: "/tmp/",
  })
);

// API Routes
const apiVersion = "/api/v1";
app.use(`${apiVersion}/user`, userRouter);
app.use(`${apiVersion}/application`, applicationRoutes);
app.use(`${apiVersion}/job`, jobRouter);
app.use(`${apiVersion}/admin`, adminRouter);
app.use(`${apiVersion}/visit`, visitRoutes);

// Database Connection
dbConnection();

// Error Middleware
app.use(errorMiddleware);

export default app;
