import mongoose from "mongoose";

const subtaskSchema = new mongoose.Schema(
  {
    heading: {
      type: String,
      required: true,
      trim: true,
      minlength: [2, "Heading must be at least 2 characters"],
    },
    startDate: {
      type: Date,
    },
    deadline: {
      type: Date,
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    status: {
      type: String,
      enum: ["To Do", "In Progress", "Completed", "Review"," On hold"],
      default: "Todo",
    },
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },
  },
  { timestamps: true }
);

export const Subtask = mongoose.model("Subtask", subtaskSchema);
