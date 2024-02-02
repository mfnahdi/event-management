import { getEventsByCategoryRepo } from '@/repositories/getEventByCategoryRepo';

export const getEventsByCategoryAction = async (category: string) => {
  try {
    const events = await getEventsByCategoryRepo(category);
    return {
      status: 200,
      message: 'success',
      data: events,
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
};
