// ReviewRepository.ts
import prisma from '@/prisma';

export const reviewRepository = {
  createReview: async (data: {
    eventId: number;
    userId: number;
    content: string;
    rating: number;
  }) => {
    return prisma.review.create({
      data,
    });
  },

  getReviewsByEventId: async (eventId: number) => {
    return prisma.review.findMany({
      where: {
        eventId,
      },
    });
  },
};
