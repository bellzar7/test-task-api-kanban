import { Request, Response } from 'express';
import * as userService from '../services/userService';

export const registerUser = async (req: Request, res: Response) => {
    try {
        const { login, password, name } = req.body;
        await userService.createUser(login, password, name);
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error registering user', error });
    }
};

export const loginUser = async (req: Request, res: Response) => {
    try {
        const { login, password } = req.body;
        const user = await userService.findUserByLogin(login);
        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const token = userService.generateToken(user._id);
        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in', error });
    }
};

export const getUserInfo = async (req: Request, res: Response) => {
    try {
        const user = await userService.findUserById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user info', error });
    }
};