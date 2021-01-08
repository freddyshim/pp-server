import { Request, Response, NextFunction } from 'express';
import { User } from '../models/User';

/**
 * Middleware for verifying login credentials.
 */
export const requireLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const id = req.header('User-id');
  const token = req.header('Authorization');

  // missing credentials
  if (!id || !token) {
    res.status(400).send('Invalid credentials');
    return;
  }

  // invalid credentials
  const user = await User.findOne({ id });
  if (!user) {
    res.status(404).send('User not found');
    return;
  }

  // attach user to request
  req.user = user;
  next();
};
