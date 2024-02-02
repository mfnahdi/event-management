import prisma from '@/prisma';

export const getAllEventRepo = async () => {
  try {
    const allEvent = await prisma.event.findMany();
    return allEvent;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
