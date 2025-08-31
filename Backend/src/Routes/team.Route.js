import { createTeam, deleteTeams, fetchTeamByQuery, showTeams, updateTeam } from '../Controllers/team.controller.js';
import express from 'express';
import { authenticate } from "../Middlewares/authMiddleware.js";

const router = express.Router();

router.post('/', authenticate, createTeam);
router.get('/', authenticate, showTeams);
router.patch('/:id', authenticate, updateTeam);
router.delete('/:id', deleteTeams);
router.get('/search', authenticate, fetchTeamByQuery);

export default router;