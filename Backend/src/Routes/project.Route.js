import { createProject, deleteProject, showProjects, updateProject } from "../Controllers/project.controller.js";
import express from 'express';
import { authenticate } from "../Middlewares/authMiddleware.js";

const router = express.Router();

router.post('/',authenticate, createProject);
router.get('/',authenticate, showProjects);
router.patch('/:id',authenticate, updateProject);
router.delete('/:id',authenticate, deleteProject);

export default router;