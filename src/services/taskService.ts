import Task, { ITask } from '../models/Task';
import Project from '../models/Project';
import { Types } from 'mongoose';

export const createTask = async (
    name: string,
    description: string,
    projectId: string,
    userId: string
): Promise<ITask> => {
    const task = new Task({
        name,
        description,
        projectId,
        userId,
        history: [{ status: 'TODO', timestamp: new Date() }]
    });
    await task.save();
    await Project.findByIdAndUpdate(projectId, { $push: { tasks: task._id } });
    return task;
};

export const updateTask = async (
    taskId: string,
    updates: Partial<ITask>
): Promise<ITask | null> => {
    const task = await Task.findById(taskId);
    if (!task) return null;

    Object.assign(task, updates);
    if (updates.status) {
        task.history.push({ status: updates.status, timestamp: new Date() });
    }
    await task.save();
    return task;
};

export const deleteTask = async (taskId: string, projectId: string): Promise<boolean> => {
    const task = await Task.findByIdAndDelete(taskId);
    if (!task) return false;

    await Project.findByIdAndUpdate(projectId, { $pull: { tasks: task._id } });
    return true;
};