import { Response } from 'express';

export class SignoutService {
  logOut(res: Response) {
    res.clearCookie('token');
    res.status(200).send({
      success: true,
      message: 'logged out',
    });
  }
}
