import { Subtask } from "../Models/subtask.model.js";
import { z } from "zod";
import { Project } from "../Models/project.model.js";
import { User } from "../Models/user.model.js";
import mongoose from "mongoose";

const objectIdSchema = z.string().refine(
  (val) => {
    return mongoose.Types.ObjectId.isValid(val);
  },
  {
    message: "Invalid MongoDB ObjectId",
  }
);

//create subtask
export const createSubtask = async (req, res) => {
  //get the data validate using zod store in result and if !result.success is true return Invalid data
  //destruct the object from result.data
  //find the project id in data base if not exists then return project does not exists
  //find whether the Assigned to user exists or not if not return the user to which task assigned does not exists
  //create the subtask in the database if created return created successfully and with data
  const subtaskSchema = z.object({
    heading: z.string().min(2, "minimum 2 characters long"),
    startDate: z.coerce.date().optional(),
    deadline: z.coerce.date().optional(),
    status: z.enum(["To Do", "In Progress", "Completed", "Review"," On hold"]).optional(),
    assignedTo: z.string().optional(),
  });
  const result = subtaskSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({
      message: "invalid data",
      error: result.error.errors,
    });
  }
  console.log(req.body)
  try {
    const projectId = req.params.projectId;
    const { heading, deadline, startDate, status, assignedTo } = result.data;
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(400).json({
        message: "project not found",
      });
    }
  
    const user = await User.findById(assignedTo);
    if(assignedTo) {
      if (!user) {
        return res.status(400).json({
          message: "user to which task assigned does not exists",
        });
      }
    }

    const subtask = await Subtask.create({
      heading,
      startDate,
      deadline,
      assignedTo: user,
      status,
      projectId: projectId,
    });

    return res.status(200).json({
      heading: subtask.heading,
      status: subtask.status,

    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

//read subtask
export const showSubtask = async (req, res) => {
  //this will be get response
  //get the project id from frontend
  //find the project that it exists if not exists return project does not exists
  //find subtask with project the project ID from data base
  // return the response with subtask full data
  try {
    const projectId = req.params.projectId;
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(400).json({
        message: "project not found",
      });
    }
    const subtasks = await Subtask.find({ projectId })
      .populate("assignedTo", "username")
      .lean();

    // directly replace assignedTo with just username
    subtasks.forEach((subtask) => {
      subtask.assignedTo = subtask.assignedTo?.username || null;
    });
    return res.status(200).json(subtasks);
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

//update subtask
export const updateSubtask = async (req, res) => {
  //get the data validate using zod store in result and if !result.success is true return Invalid data
  //destruct the object from result.data
  //find subtask by id if not exists then return subtask does not exists
  //find the assigned user if not exists then return that the assigned user does not exists
  //update the subtask with data and return data updated successfully
  const subtaskSchema = z.object({
    heading: z.string().min(2, "minimum 2 characters long").optional(),
    status: z.enum(["To Do", "In Progress", "Completed", "Review"," On hold"]).optional(),
    assignedTo: z.string().optional(),
  });
  const result = subtaskSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({
      message: "invalid data",
      error: result.error.flatten(),
    });
  }
  try {
    const { heading, status, assignedTo } = result.data;
    const subtaskId = req.params.subtaskId;

    const user = await User.find({ username: assignedTo });
    if (!user) {
      return res.status(400).json({
        message: "user to which task assigned does not exists",
      });
    }
    const subtask = await Subtask.findByIdAndUpdate(subtaskId, {
      heading,
      status,
      assignedTo: user._id,
    });
    
    return res.status(200).json({
      heading: subtask.heading,
      assignedTo: assignedTo,
      status: subtask.status,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

//delete subtask
export const deleteSubtask = async (req, res) => {
  //get the subtask
  //find subtask by id if not exists then return subtask does not exists
  //delete the subtask with data and return data updated successfully
  try {
    const subtaskId = req.params.subtaskId;
    const subtask = await Subtask.findByIdAndDelete(subtaskId);
     if (!subtask) {
      return res.status(404).json({ message: "Subtask not found" });
    }
    console.log('subtask deleted successful')
    return res.status(200).json({
      message: "subtask deleted successfully",
      subtask,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};
