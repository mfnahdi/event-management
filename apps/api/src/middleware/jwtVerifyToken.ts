import { NextFunction, Request, Response } from 'express';
import jwt, { TokenExpiredError } from 'jsonwebtoken';

const secretKey = process.env.JWT_SECRET_KEY as string;

interface PayloadToken {
  email: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: PayloadToken;
    }
  }
}

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({
      message: 'Authentication failed, token is missing',
    });
  }

  jwt.verify(token, secretKey, (err, payload) => {
    if (err) {
      if (err instanceof TokenExpiredError) {
        return res.status(403).json({ message: 'Token expired' });
      } else {
        return res.status(403).json({ message: 'Invalid token' });
      }
    }

    // Ensure payload is of type PayloadToken
    const payloadToken = payload as PayloadToken;

    req.user = payloadToken;

    next();
  });
};
