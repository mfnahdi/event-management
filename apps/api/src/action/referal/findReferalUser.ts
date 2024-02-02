import { findUserByReferralCode } from "@/repositories/reward/findUserByReferralCode";



export const findUserByReferralCodeAction = async (refferal: string) => {
  try {
    const data = await findUserByReferralCode(refferal);

    if (!data) {
      return {
        status: 404,
        message: 'Not Found Refferal',
      };
    }
    return {
      status: 200,
      message: 'Refferal exist',
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
};