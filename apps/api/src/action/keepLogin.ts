import { excludeFields } from '@/helpers/excludeFields';
import { findUserByEmail } from '@/repositories/findUserByEmail';

export const keepLoginAction = async (email: string) => {
  try {
    const user = await findUserByEmail(email);
    if (!user) throw new Error('account not found');
    const dataWithoutPassword = excludeFields(user, ['password']);

    return {
      message: 'keeplogin success',
      data: dataWithoutPassword,
    };
  } catch (error) {
    throw error;
  }
};