import express from "express";
import {
  getAllUsers,
  getJobSeekers,
  getEmployers,
  getUserCounts,
  deleteUser,
} from "../controllers/adminController.js";
import { isAuthenticated } from "../middlewares/auth.js"; // Middleware to check if user is authenticated
import { verifyAdmin } from "../middlewares/verifyAdmin.js";

const router = express.Router();

// Protect routes with authentication and admin verification
router.get("/all-users", isAuthenticated, verifyAdmin, getAllUsers);
router.get("/job-seekers", isAuthenticated, verifyAdmin, getJobSeekers);
router.get("/employers", isAuthenticated, verifyAdmin, getEmployers);
router.get("/user-counts", isAuthenticated, verifyAdmin, getUserCounts);
router.delete("/delete-user/:id", isAuthenticated, verifyAdmin, deleteUser);

export default router;
