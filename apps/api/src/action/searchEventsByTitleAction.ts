// actions/searchEventByTitleAction.ts

import { Response, Request, NextFunction } from 'express';
import { searchEventByTitleRepo } from '@/repositories/searchEventByTitleRepo';

export const searchEventByTitleAction = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { title } = req.query;

  try {
    if (!title || typeof title !== 'string') {
      return res.status(400).json({ message: 'Invalid title parameter' });
    }

    const events = await searchEventByTitleRepo(title);
    res.status(200).json(events);
  } catch (error) {
    console.error('Error searching events by title:', error);
    next(error);
  }
};
