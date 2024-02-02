import { excludeFields } from '@/helpers/excludeFields';
import { comparePasswords, hashPassword } from '@/lib/bcrypt';
import { createToken } from '@/lib/jwt';
import { findUserByEmail } from '@/repositories/findUserByEmail';

import { IUser } from '@/models/user.type';

export const loginAction = async (data: IUser) => {
  try {
    const { email, password } = data;
    const user = await findUserByEmail(email);
    if (!user) throw new Error('account not found');

    const isPasswordValid = await comparePasswords(password, user.password);
    if (!isPasswordValid) throw new Error('Invalid password');
    const dataWithoutPassword = excludeFields(user, ['password']);

    const token = createToken({ email: user.email });

    return {
      message: 'Login success',
      data: dataWithoutPassword,
      token,
    };
  } catch (error) {
    throw error;
  }
};
