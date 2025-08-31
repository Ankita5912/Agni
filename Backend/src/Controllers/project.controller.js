import { Project } from "../Models/project.model.js";
import { Subtask } from "../Models/subtask.model.js";
import { User } from "../Models/user.model.js";
import mongoose from "mongoose";
import {z} from 'zod'
import { Team } from "../Models/team.model.js";

const objectIdSchema = z.string().refine((val) => {
  return mongoose.Types.ObjectId.isValid(val);
}, {
  message: "Invalid MongoDB ObjectId"
});


//create Project 
export const createProject = async (req, res) => {
  //get the data validate using zod store in result and if !result.success is true return Invalid data
  //destruct the object from result.data
  //create the Project in the database if created return created successfully and with data 

  const projectSchema = z.object({
    heading: z.string().min(2, "minimum 2 characters long"),
    description: z.string().min(10, "minimum 10 characters long").optional(),
    startDate: z.coerce.date(),
    deadline: z.coerce.date(),
    status: z.enum(["To Do" , "In Progress" , "Completed" , "On Hold" , "Review"])
  });

  const result = projectSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({
      message: "Invalid data",
      error: result.error.flatten(),
    })
  }
  try {
    const { heading, description, deadline, startDate, status } = result.data;
    const user = req.user._id;
    const project = await Project.create({
      heading,
      description,
      startDate,
      deadline,
      createdBy: user,
      status
    })
    
    return res.status(200).json({
      message: "Project created Sucessfully",
      project
    })
  } catch (error) {
    return res
      .status(500)
      .json({
        message: "Internal server error",
        error: error.message
      })
    
  }
}

//read Project 
export const showProjects = async (req, res) => {
  //this will be get response
  //get the user id from frontend
  //if user exists in db if not return user does not exists
  //find the projects that is created by the user and which user is a member in team
  // return the response with all the projects with id
  const userID = req.user._id;
  try {
    const user = await User.findById(userID)
    if (!user) {
      return res.status(400).json({
        message: "User does not exists",
      })
    }
    const objectId = new mongoose.Types.ObjectId(userID);
    const projects = await Project.aggregate([
      {
        $lookup: {
          from: "teams",             // collection name
          localField: "teams",       // field in Project
          foreignField: "_id",       // field in Team
          as: "teamDetails"
        }
      },
      {
        $match: {
          $or: [
            { createdBy: objectId },
            { "teamDetails.members": objectId }
          ]
        }
      }
    ])
    return res.status(200).json({ projects });
  } catch (error) {
    return res
      .status(500)
      .json({
        message: "Internal server error",
        error: error.message
      })
  }
}


//update Project 

  //get the data validate using zod store in result and if !result.success is true return Invalid data
  //destruct the object from result.data 
  //find project by id if not exists then return project does not exists
  //find the assigned team if not exists then return that the assigned team does not exists
  //update the project with data and return data updated successfully
  export const updateProject = async (req, res) => {
  const projectSchema = z.object({
    heading: z.string().min(2, "minimum 2 characters long").optional(),
    description: z.string().min(10, "minimum 10 characters long").optional(),
    status: z.enum(["To Do" , "In Progress" , "Completed" , "On Hold" , "Review"]).optional(),
    teamId: objectIdSchema.optional()
  });

    const result = projectSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({
      message: "Invalid data",
      error: result.error.errors
    });
  }

  try {
    const { heading, description, status, teamId } = result.data;
    console.log("Assigned team:", teamId);
    console.log(teamId);

    if (teamId) {
      const assignedTeam = await Team.findById(teamId);
      if (!assignedTeam) {
        return res.status(404).json({
          message: "Team does not exist"
        });
      }
    }

    const projectID = req.params.id;
     console.log(projectID)
    const project = await Project.findByIdAndUpdate(
      projectID,
      { heading, description, status, teamId }
    );
    
    if (!project) {
      return res.status(404).json({ message: "Project does not exist" });
    }

    return res.status(200).json({
      message: "Project updated successfully",
      project
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error: error.message
    });
  }
};


//delete Project 
export const deleteProject = async (req, res) => {
  //get the project
  //find project by id if not exists then return project does not exists
  //also delete the subtask with the projects id
  //delete the Project with data and return data updated successfully


  try {
    const projectID = req.params.id;

    const project = await Project.findByIdAndDelete(projectID);

    return res.status(200).json({
      message: "Project delete successfully",
      project
    })

  } catch (error) {
    return res
      .status(500)
      .json({
        message: "Internal server error",
        error: error.message
      })
  }
}