import app from "./app.js";
import cloudinary from "cloudinary";

// use cloudinary and its version name is V2

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLIENT_NAME,
  api_key: process.env.CLOUDINARY_CLIENT_API,
  api_secret: process.env.CLOUDINARY_CLIENT_SECRET,
});

// Starts the server and listens for incoming requests on the port specified in the environment variables.

const PORT = process.env.PORT || 6000;

app.listen(PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
