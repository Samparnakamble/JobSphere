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

// CORS configuration
const corsOptions = {
  origin: process.env.FRONTEND_URL || "http://localhost:5173", // Fallback to local frontend
  methods: ["GET", "POST", "DELETE", "PUT"],
  credentials: true,
};

app.use(cors(corsOptions));

console.log(`CORS enabled for: ${process.env.FRONTEND_URL || "http://localhost:5173"}`);

// Middlewares
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  fileUpload({
    useTempFiles: true, // Required for cloudinary
    tempFileDir: "/tmp/",
  })
);

// API routes
const apiVersion = "/api/v1";

app.use(`${apiVersion}/user`, userRouter);
app.use(`${apiVersion}/application`, applicationRoutes);
app.use(`${apiVersion}/job`, jobRouter);
app.use(`${apiVersion}/admin`, adminRouter);
app.use(`${apiVersion}/visit`, visitRoutes);

// Database connection
dbConnection();

// Error middleware
app.use(errorMiddleware);

export default app;
