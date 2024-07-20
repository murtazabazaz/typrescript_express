import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../model/user';

const secret = 'secret'; // Hardcoded JWT secret

interface AuthenticatedRequest extends Request {
    user?: any;
}

const isAuthenticated = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    console.log('Middleware: isAuthenticated invoked');

    const token = req.header('Authorization')?.replace('Bearer ', '');
    console.log('Extracted Token:', token);

    if (!token) {
        console.log('No token provided');
        return res.status(401).json({ error: 'No token provided' });
    }

    try {
        console.log('Attempting to verify token');

        const decoded : any = await jwt.verify(token, secret);

        console.log('Decoded Token:', decoded);

        const user = await User.findById(decoded?._id);
        console.log('User found:', user);

        if (!user) {
            console.log('User not found');
        }
        
        req.user = user;
        next();
    } catch (error) {
        console.log('Error during authentication:', error);
        res.status(401).json({ error: 'Unauthorized' });
    }
};

export default isAuthenticated;