import { Request, Response } from 'express';
import * as taskService from '../services/taskService';
import { io } from '../server';

export const createTask = async (req: Request, res: Response) => {
    try {
        const { name, description } = req.body;
        const projectId = req.params.projectId;
        const task = await taskService.createTask(name, description, projectId, req.user!._id);

        io.to(projectId).emit('taskCreated', task);
        res.status(201).json(task);
    } catch (error) {
        res.status(500).json({ message: 'Error creating task', error });
    }
};

export const updateTask = async (req: Request, res: Response) => {
    try {
        const { name, description, status } = req.body;
        const task = await taskService.updateTask(req.params.taskId, { name, description, status });
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        if (task.projectId.toString() !== req.params.projectId) {
            return res.status(400).json({ message: 'Task does not belong to this project' });
        }

        io.to(req.params.projectId).emit('taskUpdated', task);
        res.json(task);
    } catch (error) {
        res.status(500).json({ message: 'Error updating task', error });
    }
};

export const deleteTask = async (req: Request, res: Response) => {
    try {
        const success = await taskService.deleteTask(req.params.taskId, req.params.projectId);
        if (!success) {
            return res.status(404).json({ message: 'Task not found' });
        }

        io.to(req.params.projectId).emit('taskDeleted', req.params.taskId);
        res.json({ message: 'Task deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting task', error });
    }
};