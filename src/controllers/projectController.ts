import { Request, Response } from 'express';
import * as projectService from '../services/projectService';

export const createProject = async (req: Request, res: Response) => {
    try {
        const { name } = req.body;
        const project = await projectService.createProject(name, req.user!._id);
        res.status(201).json(project);
    } catch (error) {
        res.status(500).json({ message: 'Error creating project', error });
    }
};

export const getProjects = async (req: Request, res: Response) => {
    try {
        const projects = await projectService.findUserProjects(req.user!._id);
        res.json(projects);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching projects', error });
    }
};

export const inviteUser = async (req: Request, res: Response) => {
    try {
        const { userId } = req.body;
        const project = await projectService.findProjectById(req.params.projectId);
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }
        if (!project.users.some(user => user._id.equals(req.user!._id))) {
            return res.status(403).json({ message: 'Not authorized to invite users to this project' });
        }
        if (project.users.some(user => user._id.equals(userId))) {
            return res.status(400).json({ message: 'User already in project' });
        }
        await projectService.addUserToProject(req.params.projectId, userId);
        res.json({ message: 'User invited successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error inviting user', error });
    }
};

export const getProjectInfo = async (req: Request, res: Response) => {
    try {
        const project = await projectService.findProjectById(req.params.projectId);
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }
        if (!project.users.some(user => user._id.equals(req.user!._id))) {
            return res.status(403).json({ message: 'Not authorized to view this project' });
        }
        res.json(project);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching project info', error });
    }
};