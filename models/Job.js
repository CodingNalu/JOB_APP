import mongoose from "mongoose";
const JobSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: [true, "please provide company name"],
      maxLength: 50,
    },
    position: {
      type: String,
      required: [true, "Please provide postion"],
      maxLength: 100,
    },
    status: {
      type: String,
      enum: ["interview", "declined", "pending"],
      default: "pending",
    },
    jobType: {
      type: String,
      enum: ["full-time", "part-time", "romote", "intership"],
      default: "full-time",
    },
    jobLocation: {
      type: String,
      default: "my city",
      required: true,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "please provide creator"],
    },
  },
  {
    timestamps: true,
  }
);
const Job = mongoose.model("Job", JobSchema);
export default Job;
