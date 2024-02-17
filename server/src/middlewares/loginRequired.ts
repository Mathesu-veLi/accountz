import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

@Injectable()
export class LoginRequiredMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers;

    if (!authorization)
      return res.status(401).send({
        message: 'Unauthorized. Create a token first!',
      });

    const [, token] = authorization.split(' ');

    try {
      verify(token, process.env.TOKEN_SECRET);

      return next();
    } catch (error) {
      return res.status(401).send({
        message: 'Token expired or invalid',
      });
    }
  }
}
