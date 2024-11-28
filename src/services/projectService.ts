import Project, { IProject } from '../models/Project';
import { Types } from 'mongoose';

export const createProject = async (name: string, userId: string): Promise<IProject> => {
    const project = new Project({ name, users: [userId] });
    await project.save();
    return project;
};

export const findUserProjects = async (userId: string): Promise<IProject[]> => {
    return Project.find({ users: userId });
};

export const findProjectById = async (projectId: string): Promise<IProject | null> => {
    return Project.findById(projectId)
        .populate('users', 'name login')
        .populate('tasks');
};

export const addUserToProject = async (projectId: string, userId: string): Promise<IProject | null> => {
    return Project.findByIdAndUpdate(
        projectId,
        { $addToSet: { users: userId } },
        { new: true }
    );
};