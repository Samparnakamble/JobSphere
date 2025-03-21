import mongoose from "mongoose";

export const dbConnection = () => {
  mongoose
    .connect(process.env.MONGO_URI, {
      dbName: "JOB_SEEKING_WEBAPP",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Connected to MongoDb database.");
    })
    .catch((err) => {
      console.log(`Some Error occured. ${err}`);
    });
};
