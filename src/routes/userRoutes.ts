import express from 'express';
import { registerUser, loginUser, getUserInfo } from '../controllers/userController';
import { auth } from '../middleware/auth';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/:id', auth, getUserInfo);

export default router;