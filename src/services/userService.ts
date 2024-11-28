import User, { IUser } from '../models/User';
import jwt from 'jsonwebtoken';

export const createUser = async (login: string, password: string, name: string): Promise<IUser> => {
    const user = new User({ login, password, name });
    await user.save();
    return user;
};

export const findUserByLogin = async (login: string): Promise<IUser | null> => {
    return User.findOne({ login });
};

export const generateToken = (userId: string): string => {
    return jwt.sign({ userId }, process.env.JWT_SECRET!, { expiresIn: '1h' });
};

export const findUserById = async (id: string): Promise<IUser | null> => {
    return User.findById(id).select('-password');
};
