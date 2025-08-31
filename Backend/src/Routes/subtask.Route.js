import express from 'express';
import { createSubtask, deleteSubtask, showSubtask, updateSubtask } from "../Controllers/subtask.controller.js";


const router = express.Router();

router.post('/:projectId/subtasks', createSubtask);
router.get('/:projectId/subtasks', showSubtask);
router.patch('/subtasks/:subtaskId', updateSubtask);
router.delete('/subtasks/:subtaskId', deleteSubtask);

export default router;