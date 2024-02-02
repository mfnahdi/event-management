import prisma from '@/prisma';

export const searchEventByTitleRepo = async (title: string) => {
  try {
    const events = await prisma.event.findMany({
      where: {
        title: {
          contains: title,
        },
      },
    });
    return events;
  } catch (error) {
    console.error('Error searching events by title:', error);
    throw error;
  }
};
