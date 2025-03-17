export const sendToken = (user, statusCode, res, message) => {
  const token = user.getJWTToken();
  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 5 * 24 * 60 * 60 * 1000 //5days-24hr-60mi-60se-1000misec
    ),
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // Set secure to true in production
  };

  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    user,
    message,
    token,
  });
};
