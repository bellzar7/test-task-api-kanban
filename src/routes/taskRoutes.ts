import express from 'express';
import { createTask, updateTask, deleteTask } from '../controllers/taskController';
import { auth } from '../middleware/auth';

const router = express.Router();

router.post('/:projectId/tasks', auth, createTask);
router.put('/:projectId/tasks/:taskId', auth, updateTask);
router.delete('/:projectId/tasks/:taskId', auth, deleteTask);

export default router;