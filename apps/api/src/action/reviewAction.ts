// ReviewAction.ts

import { reviewRepository } from '@/repositories/reviewRepo';

export const reviewAction = {
  createReview: async (data: {
    eventId: number;
    userId: number;
    content: string;
    rating: number;
  }) => {
    return reviewRepository.createReview(data);
  },

  getReviewsByEventId: async (eventId: number) => {
    return reviewRepository.getReviewsByEventId(eventId);
  },
};
