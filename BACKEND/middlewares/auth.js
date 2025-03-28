import { User } from "../models/userSchema.js";
import { catchAsyncErrors } from "./catchAsyncError.js";
import ErrorHandler from "./error.js";
import jwt from "jsonwebtoken";


// export const isAuthenticated = catchAsyncErrors(async (req, res, next) => {
//   const { token } = req.cookies;

//   if (!token) {
//     return next(
//       new ErrorHandler("User Not Authorized. No token provided.", 401)
//     );
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
//     req.user = await User.findById(decoded.id);

//     if (!req.user) {
//       return next(new ErrorHandler("User does not exist. Access denied.", 401));
//     }

//     next();
//   } catch (error) {
//     return next(new ErrorHandler("Invalid or expired token.", 401));
//   }
// });
export const isAuthenticated = catchAsyncErrors(async (req, res, next) => {
  let token = req.cookies.token;

  // If token is not in cookies, check the Authorization header
  if (!token && req.headers.authorization?.startsWith("Bearer ")) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(new ErrorHandler("User Not Authorized. No token provided.", 401));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = await User.findById(decoded.id);

    if (!req.user) {
      return next(new ErrorHandler("User does not exist. Access denied.", 401));
    }

    next();
  } catch (error) {
    return next(new ErrorHandler("Invalid or expired token.", 401));
  }
});

