import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";
import { User } from "../models/userSchema.js";
import ErrorHandler from "../middlewares/error.js";
import { sendToken } from "../utils/jwtToken.js";

export const register = catchAsyncErrors(async (req, res, next) => {
  const { name, email, phone, password, role } = req.body;

  // Ensure all fields are provided
  if (!name || !email || !phone || !password || !role) {
    return next(new ErrorHandler("Please fill the full registration form!"));
  }

  // Handle Admin-specific registration logic
  if (role === "Admin") {
    // Check if user with email already exists
    const isEmail = await User.findOne({ email });
    if (isEmail) {
      return next(new ErrorHandler("Email already registered!"));
    }

    // Create Admin user
    const user = await User.create({
      name,
      email,
      phone,
      password,
      role,
    });
    return sendToken(user, 201, res, "Admin Registered Successfully!");
  }

  // Validate phone number
  const phonePattern = /^[2-9]{1}[0-9]{9}$/; // Ensures 10 digits and does not start with 1
  if (!phonePattern.test(phone)) {
    return next(
      new ErrorHandler(
        "Invalid phone number! It must be 10 digits and should not start with 1."
      )
    );
  }

  // Handle regular user registration logic (Job Seeker/Employer)
  const isEmail = await User.findOne({ email });
  if (isEmail) {
    return next(new ErrorHandler("Email already registered!"));
  }

  // Create regular user (Job Seeker or Employer)
  const user = await User.create({
    name,
    email,
    phone,
    password,
    role,
  });

  sendToken(user, 201, res, "User Registered Successfully!");
  const { token } = response.data;
  localStorage.setItem("token", token);
});

export const login = catchAsyncErrors(async (req, res, next) => {
  const { email, password, role } = req.body;

  // Check if all required fields are provided
  if (!email || !password || !role) {
    return next(new ErrorHandler("Please provide email, password, and role."));
  }

  // Find the user by email and include password in the result
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Invalid Email Or Password.", 400));
  }

  // Compare the entered password with the stored password
  const isPasswordMatched = await user.comparePassword(password);
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid Email Or Password.", 400));
  }

  // Check if the role matches the user role
  if (role !== user.role) {
    return next(new ErrorHandler("User role does not match.", 400));
  }

  // If the user is an Admin and they logged in with Admin role
  if (role === "Admin" && user.role !== "Admin") {
    return next(new ErrorHandler("Access denied! Admins only.", 403));
  }

  // If the user is not an Admin, proceed with general login
  sendToken(user, 201, res, `${role} Logged in Successfully!`);
  const { token } = response.data;
  localStorage.setItem("token", token);
});

export const logout = catchAsyncErrors(async (req, res, next) => {
  res
    .status(201)
    .cookie("token", "", {
      httpOnly: true,
      expires: new Date(Date.now()),
    })
    .json({
      success: true,
      message: "User Logged Out Successfully !",
    });
});

export const getUser = catchAsyncErrors((req, res, next) => {
  const user = req.user;
  res.status(200).json({
    success: true,
    user,
  });
});
