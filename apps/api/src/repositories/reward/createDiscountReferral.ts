import prisma from '@/prisma';
import { ICouponDiscount } from '@/models/reward.type';

export const createDiscountReferral = async (data: ICouponDiscount) => {
  try {
    const { userId, couponCode, discountPersentase, expiresOn } = data;
    const result = await prisma.couponDiscount.create({
      data: {
        userId,
        couponCode,
        discountPersentase,
        expiresOn,
      },
    });
    return result;
  } catch (error) {
    throw error;
  }
};
