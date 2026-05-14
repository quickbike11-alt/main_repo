import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import { ApiError } from '../utils/ApiError';

export interface AuthRequest extends Request {
  user?: any;
}

export const verifyToken = async (req: AuthRequest, _res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return next(new ApiError(401, 'No token provided'));

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret') as { id: string };
    const user = await User.findById(decoded.id).select('-password');
    if (!user) return next(new ApiError(401, 'User not found'));
    req.user = user;
    next();
  } catch {
    next(new ApiError(401, 'Invalid token'));
  }
};
