import { Event } from '@/models/event';
import { updateEventRepo } from '@/repositories/updateEventRepo';

export const updateEventAction = async (id: number, body: Event) => {
  try {
    const event = await updateEventRepo(id, body);
    return {
      status: 200,
      message: 'Success Update',
      data: event,
    };
  } catch (error) {
    throw error;
  }
};
