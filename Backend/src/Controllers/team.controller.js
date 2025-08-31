import mongoose from "mongoose";
import { z } from "zod";
import { Team } from "../Models/team.model.js";

// Zod Schemas
const objectIdSchema = z.string().refine(
  (val) => mongoose.Types.ObjectId.isValid(val),
  { message: "Invalid MongoDB ObjectId" }
);

const createTeamSchema = z.object({
  name: z.string().min(2, "Minimum two characters required"),
  members: z.array(objectIdSchema).optional(),
  teamId: z.string().min(3, { message: "Team id must be at least 3 characters" }).max(20, { message: "Team id must be less than 20 characters" }).regex(/^[a-zA-Z0-9_]+$/, { message: "Team id can only contain letters, numbers, and underscores" }).transform((val) => val.trim().toLowerCase())// mimic trim + lowercase
});

const updateTeamSchema = z.object({
  teamId: objectIdSchema,
  name: z.string().min(2, "Minimum two characters required").optional(),
  members: z.array(objectIdSchema).optional(),
  teamId: z.string().min(3, { message: "Team id must be at least 3 characters" }).max(20, { message: "Team id must be less than 20 characters" }).regex(/^[a-zA-Z0-9_]+$/, { message: "Team id can only contain letters, numbers, and underscores" }).transform((val) => val.trim().toLowerCase())// mimic trim + lowercase
});


// CREATE TEAM

export const createTeam = async (req, res) => {
  const result = createTeamSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      message: "Validation error",
      error: result.error.errors,
    });
  }
  const user = req.user._id
  try {
    const { name, members, teamId } = result.data;

    // Check if a team with the same name already exists for this user
    const teamExists = await Team.findOne({ teamId });
    if (teamExists) {
      return res.status(400).json({
        message: "Team with similar team Id already exists",
      });
    }

    const team = await Team.create({
      name,
      createdBy: user,
      members,
      teamId
    });

    return res.status(201).json({
      message: "Team created successfully",
      team,
    });
  } catch (error) {
    console.log('Failed to create team',error);
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};


// SHOW TEAMS TO THE PARTICULAR USER(user-created + member)

export const showTeams = async (req, res) => {
  const userId = req.user._id; // from token

  try {
    const teams = await Team.find({
      $or: [{ createdBy: userId }, { members: userId }],
    })
      .populate("createdBy", "name email")
      .populate("members", "name email");

    return res.status(200).json({
      message: "Teams fetched successfully",
      teams,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};


// DELETE TEAM

export const deleteTeams = async (req, res) => {
  const teamId = req.params.teamId;
  const userId = req.user._id;

  if (!mongoose.Types.ObjectId.isValid(teamId)) {
    return res.status(400).json({ message: "Invalid team ID" });
  }

  try {
    const team = await Team.findById(teamId);
    if (!team) {
      return res.status(404).json({ message: "Team not found" });
    }

    if (team.createdBy.toString() !== userId.toString()) {
      return res.status(403).json({ message: "Permission denied" });
    }

    await Team.findByIdAndDelete(teamId);

    return res.status(200).json({
      message: "Team deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

// UPDATE TEAM

export const updateTeam = async (req, res) => {
  const result = updateTeamSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      message: "Validation error",
      error: result.error.errors,
    });
  }

  try {
    const { teamId, name, members } = result.data;
    const userId = req.user._id;

    const team = await Team.findById(teamId);
    if (!team) {
      return res.status(404).json({ message: "Team not found" });
    }

    if (team.createdBy.toString() !== userId.toString()) {
      return res.status(403).json({ message: "Permission denied" });
    }

    if (name) team.name = name;
    if (members) team.members = members;

    await team.save();

    return res.status(200).json({
      message: "Team updated successfully",
      team,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};


// SHOW TEAM ACCORDING TO QUERY SEARCH WITH KEYWORDS
export const fetchTeamByQuery = async (req, res) => {
  try {
    const search = req.query.search;
    console.log("Search query:", search);
    const team = await Team.find({
      teamId: { $regex: `^${search}`, $options: 'i' }
    }).limit(10).select('_id teamId');
    console.log("Teams found:", team);  
    return res.json({team})
  } catch (error) {
    return res.status(500).json({
      message: 'Internal Server'
    })
  }
}
