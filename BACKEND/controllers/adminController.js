import { User } from "../models/userSchema.js";
import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/error.js";

// Get all users (Job Seekers and Employers) - Admin Only
export const getAllUsers = catchAsyncErrors(async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({
    success: true,
    users,
  });
});

// Get Job Seekers - Admin Only
export const getJobSeekers = catchAsyncErrors(async (req, res, next) => {
  const jobSeekers = await User.find({ role: "Job Seeker" });
  res.status(200).json({
    success: true,
    jobSeekers,
  });
});

// Get Employers - Admin Only
export const getEmployers = catchAsyncErrors(async (req, res, next) => {
  const employers = await User.find({ role: "Employer" });
  res.status(200).json({
    success: true,
    employers,
  });
});

// Get user counts (Job Seekers and Employers) - Admin Only
export const getUserCounts = catchAsyncErrors(async (req, res, next) => {
  const jobSeekerCount = await User.countDocuments({ role: "Job Seeker" });
  const employerCount = await User.countDocuments({ role: "Employer" });

  res.status(200).json({
    success: true,
    jobSeekerCount,
    employerCount,
  });
});

// Delete a user (Job Seeker or Employer) - Admin Only
export const deleteUser = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findByIdAndDelete(req.params.id);

  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }

  res.status(200).json({
    success: true,
    message: "User deleted successfully!",
  });
});
