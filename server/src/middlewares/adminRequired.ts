import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class AdminRequiredMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers;

    if (!authorization)
      return res.status(401).send({
        message: 'Unauthorized. Pass the admin password!',
      });

    try {
      if (authorization !== process.env.ADMIN_PASSWORD) throw new Error();
      return next();
    } catch (error) {
      return res.status(401).send({
        message: 'Unauthorized. Pass the admin password!',
      });
    }
  }
}
