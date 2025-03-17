import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please provide a job title."],
    minLength: [4, "Job itle must contain at least 4 Characters!"],
    maxLength: [30, "Job title cannot exceed 30 Characters!"],
  },
  description: {
    type: String,
    required: [true, "Please provide decription."],
    minLength: [10, "Description must contain at least 30 Characters!"],
    maxLength: [10000, "Description cannot exceed 500 Characters!"],
  },
  category: {
    type: String,
    required: [true, "Please provide a Job category."],
  },
  country: {
    type: String,
    required: [true, "Please provide a Job country name."],
  },
  city: {
    type: String,
    required: [true, "Please provide a Job city name."],
  },
  location: {
    type: String,
    required: [true, "Please provide Job location."],
    minLength: [5, "Location must contian at least 20 characters!"],
  },
  fixedSalary: {
    type: Number,
    minLength: [4, "Fixed Salary must contain at least 4 digits"],
    maxLength: [9, "Fixed Salary cannot exceed 9 digits"],
  },
  salaryFrom: {
    type: Number,
    minLength: [4, "Salary from  must contain at least 4 digits"],
    maxLength: [9, "Salary from cannot exceed 9 digits"],
  },
  salaryTo: {
    type: Number,
    minLength: [4, "SalaryTo must contain at least 4 digits"],
    maxLength: [9, "SalaryTo cannot exceed 9 digits"],
  },
  expired: {
    type: Boolean,
    default: false,
  },
  jobPostedOn: {
    type: Date,
    default: Date.now,
  },
  postedBy: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Job = mongoose.model("Job", jobSchema);
