import { getAllEventRepo } from '@/repositories/getAllEventRepo';

export const allEventsAction = async () => {
  try {
    const allEvents = await getAllEventRepo();
    return {
      status: 200,
      message: 'success',
      data: allEvents,
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
};
