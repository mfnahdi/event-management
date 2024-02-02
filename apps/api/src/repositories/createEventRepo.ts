import { Event } from '@/models/event';
import prisma from '@/prisma';

export const createEventRepo = async (data: Event) => {
  try {
    const {
      title,
      description,
      details,
      price,
      dateTime,
      category,
      location,
      seat,
      image,
    } = data;
    const newEvent = await prisma.event.create({
      data: {
        title,
        description,
        details,
        price,
        dateTime: new Date(dateTime).toISOString(),
        category,
        location,
        seat,
        image,
      },
    });

    return newEvent;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
