// ReviewController.ts
import { reviewAction } from '@/action/reviewAction';
import { Request, Response } from 'express';

export const reviewController = {
  createReview: async (req: Request, res: Response) => {
    try {
      const { eventId, userId, content, rating } = req.body;

      const createdReview = await reviewAction.createReview({
        eventId,
        userId,
        content,
        rating,
      });

      return res.status(201).json(createdReview);
    } catch (error) {
      console.error('Error during review creation:', error);
      return res.status(500).json({ error: 'Failed to create review' });
    }
  },

  getReviewsByEventId: async (req: Request, res: Response) => {
    try {
      const eventId = parseInt(req.params.eventId);
      if (isNaN(eventId)) {
        throw new Error('Invalid eventId. Please provide a valid eventId');
      }

      const reviews = await reviewAction.getReviewsByEventId(eventId);
      return res.status(200).json(reviews);
    } catch (error) {
      console.error('Error getting reviews by eventId:', error);
      return res
        .status(500)
        .json({ error: 'Failed to get reviews by eventId' });
    }
  },
};
