import express from 'express';
import { createProject, getProjects, inviteUser, getProjectInfo } from '../controllers/projectController';
import { auth } from '../middleware/auth';

const router = express.Router();

router.post('/', auth, createProject);
router.get('/', auth, getProjects);
router.post('/:projectId/invite', auth, inviteUser);
router.get('/:projectId', auth, getProjectInfo);

export default router;