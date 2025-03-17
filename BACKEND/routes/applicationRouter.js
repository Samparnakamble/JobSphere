import express from "express";
// import upload from "../middlewares/multerConfig.js";
import {
  employerGetAllApplications,
  jobseekerGetAllApplications,
  jobseekerDeleteApplication,
  postApplication,
} from "../controllers/applicationController.js";
import { isAuthenticated } from "../middlewares/auth.js";
const router = express.Router();

router.post("/post", isAuthenticated, postApplication);

// router.post("/application", upload.single("resume"), postApplication);

router.get("/employer/getall", isAuthenticated, employerGetAllApplications);
router.get("/jobseeker/getall", isAuthenticated, jobseekerGetAllApplications);
router.delete("/delete/:id", isAuthenticated, jobseekerDeleteApplication);
export default router;
