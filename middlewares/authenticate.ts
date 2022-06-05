import { Request, Response, NextFunction } from 'express';

export default function checkAuth(req: Request, res: Response, next: NextFunction) {
  if (req.isUnauthenticated()) {
    return res.status(400).send({
      message: 'You have no access.',
    })
  }
  next();
}
