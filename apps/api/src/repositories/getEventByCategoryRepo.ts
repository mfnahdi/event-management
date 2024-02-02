import prisma from '@/prisma';

export const getEventsByCategoryRepo = async (category: string) => {
  try {
    const events = await prisma.event.findMany({
      where: { category },
    });
    return events;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
