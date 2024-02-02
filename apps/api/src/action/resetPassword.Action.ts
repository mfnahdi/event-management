import { hashPassword } from '@/lib/bcrypt';
import { findUserByEmail } from '@/repositories/findUserByEmail';
import { updateUser } from '@/repositories/updateUser';


interface Data {
  password: string;
  confirmPassword: string;
}
export const resetPasswordAction = async (email: string, data: Data) => {
  try {
    const { password, confirmPassword } = data;
    if (password !== confirmPassword) throw new Error('Password not match');
    const user = await findUserByEmail(email);
    if (!user) throw new Error('account not found');

    const hashedPassword = await hashPassword(password);

    await updateUser(email, { password: hashedPassword });

    return {
      message: 'reset password success',
    };
  } catch (error) {
    throw error;
  }
};