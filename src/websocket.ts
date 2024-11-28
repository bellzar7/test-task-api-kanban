import { Server } from 'socket.io';
import jwt from 'jsonwebtoken';
import User from './models/User';

export const setupWebSocket = (io: Server) => {
    io.use(async (socket, next) => {
        try {
            const token = socket.handshake.auth.token;
            const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string };
            const user = await User.findById(decoded.userId);
            if (!user) {
                return next(new Error('Authentication error'));
            }
            socket.data.user = user;
            next();
        } catch (error) {
            next(new Error('Authentication error'));
        }
    });

    io.on('connection', (socket) => {
        console.log('User connected:', socket.data.user.name);

        socket.on('joinProject', (projectId) => {
            socket.join(projectId);
            console.log(`${socket.data.user.name} joined project ${projectId}`);
        });

        socket.on('leaveProject', (projectId) => {
            socket.leave(projectId);
            console.log(`${socket.data.user.name} left project ${projectId}`);
        });

        socket.on('disconnect', () => {
            console.log('User disconnected:', socket.data.user.name);
        });
    });
};