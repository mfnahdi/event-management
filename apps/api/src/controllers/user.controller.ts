import { forgotPasswordAction } from '@/action/forgotPassword.Action';
import { keepLoginAction } from '@/action/keepLogin';
import { loginAction } from '@/action/login.action';
import { findUserByReferralCodeAction } from '@/action/referal/findReferalUser';
import { registerAction } from '@/action/register.action';
import { resetPasswordAction } from '@/action/resetPassword.Action';
import getAllUser from '@/repositories/getAllUser';
import { NextFunction, Request, Response } from 'express';

export class UserController {
  async registerUser(req: Request, res: Response, next: NextFunction) {
    try {
      const data = req.body;
      const result = await registerAction(data);
      return res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }
  async loginUser(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await loginAction(req.body);
      return res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }

  async keepLogin(req: Request, res: Response, next: NextFunction) {
    try {
      const email = req.user!.email;
      const result = await keepLoginAction(email as string);
      return res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }

  async forgotPassword(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await forgotPasswordAction(req.body.email);
      return res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }
  async resetPassword(req: Request, res: Response, next: NextFunction) {
    try {
      const email = req.user!.email;
      const result = await resetPasswordAction(email, req.body);
      return res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }

  async getAllUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await getAllUser();
      return res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }

  async checkReferralCode(req: Request, res: Response, next: NextFunction) {
    try {
      const { referralCode } = req.body;
      const result = await findUserByReferralCodeAction(referralCode);
      return res.status(result?.status).send(result);
    } catch (error) {
      next(error);
    }
  }
}
