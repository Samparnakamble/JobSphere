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

// To give path for envorinment varibles
dotenv.config({ path: "./config/config.env" });

// In this the forntend is connect to backend in url form
const corsOptions = {
  origin: [process.env.FRONTEND_URL],
  methods: ["GET", "POST", "DELETE", "PUT"],
  credentials: true,
};

// app.use is used for middlewares
app.use(cors(corsOptions));

app.use(cookieParser());
// used to pars data in json format
app.use(express.json());
// used to convert string into json
app.use(express.urlencoded({ extended: true }));

app.use(
  fileUpload({
    useTempFiles: true, // Required for cloudinary
    tempFileDir: "/tmp/",
  })
);

// app.use(fileUpload({ useTempFiles: true }));

const apiVersion = "/api/v1";

app.use(`${apiVersion}/user`, userRouter);
app.use(`${apiVersion}/application`, applicationRoutes);
app.use(`${apiVersion}/job`, jobRouter);
app.use(`${apiVersion}/admin`, adminRouter);
app.use(`${apiVersion}/visit`, visitRoutes);

dbConnection();

app.use(errorMiddleware);

export default app;
