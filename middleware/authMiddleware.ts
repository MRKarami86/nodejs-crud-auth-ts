import jwt, { JwtPayload } from 'jsonwebtoken';
import {Request, Response, NextFunction} from 'express';


export interface AuthRequest extends Request {
    userId?: string;
};

const authMiddleware = async(
    req: AuthRequest,
    res: Response,
    next: NextFunction
):Promise<void> =>{
    const header = req.headers.authorization;
    if (!header) {
        res.status(401).json({ message: 'No token' });
        return;
    }

    const token = header.split(' ')[1];
    if (!token) {
        res.status(401).json({ message: 'Invalid token format' });
        return;
    }

    const secret = process.env.JWT_SECRET;
    if (!secret) {
        throw new Error('JWT_SECRET is not defined');
    }

    try {
        const decoded = jwt.verify(token, secret) as JwtPayload;
        req.userId = decoded.userId as string;

        next();
    } catch (err) {
        console.error(err);
        res.status(401).json({ message: 'Invalid token' });
    }
};

export default authMiddleware;