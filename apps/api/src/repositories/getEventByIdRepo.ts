import prisma from '@/prisma';

export const getEventByIdRepo = async (id: number) => {
  try {
    const event = await prisma.event.findUnique({
      where: { id },
    });
    return event;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
