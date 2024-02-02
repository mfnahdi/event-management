import { Event } from '@/models/event';
import prisma from '@/prisma';

export const updateEventRepo = async (id: number, body: Event) => {
  try {
    const result = await prisma.event.update({
      where: { id },
      data: body,
    });
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
