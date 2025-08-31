import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    heading: {
      type: String,
      required: true,
      trim: true,
      minlength: [2, 'Heading must be at least 2 characters'],
    },
    description: {
      type: String,
      trim: true,
    },
    startDate: {
      type: Date,
    },
    deadline: {
      type: Date,
    },
    status: {
      type: String,
      enum: ["To Do" , "In Progress" , "Completed" , "On Hold" , "Review"],
      default: 'todo',
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    teams: { type: mongoose.Schema.Types.ObjectId, ref: "Team" }
  },
  { timestamps: true }
);

export const Project = mongoose.model('Project', projectSchema);