import { Event } from '@/models/event';
import { createEventRepo } from '@/repositories/createEventRepo';

export const createEventAction = async (data: Event) => {
  try {
    await createEventRepo(data);

    return {
      status: 200,
      message: 'Create event success',
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
};
