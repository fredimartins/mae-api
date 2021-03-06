import { NextFunction, Request, Response } from 'express';
import argon2 from 'argon2';
import passport from 'passport';
import User from '../models/User.model';

export const register = async (req: Request, res: Response) => {
  try {
    let body = req.body;
    const { name, email, password } = body;

    if (!password) {
      return res.status(400).send({
        message: 'Field password required!',
      });
    }

    const hashedPassword = await argon2.hash(password);

    let user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    delete body.password;

    res.send({
      data: body,
    });
  } catch (error:any) {
    let statusCode = 500;
    let errorMsg = 'Register failed';

    if (error.name === 'SequelizeUniqueConstraintError') {
      statusCode = 400;
      errorMsg = 'Email already used';
    }

    res.status(statusCode).send({
      message: errorMsg,
    });
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return next(err);
    }

    if (!user) {
      return res.status(404).send({
        message: info.message,
      });
    }

    req.login(user, function (err) {
      if (err) {
        return next(err);
      }

      return res.status(200).send();
    });
  })(req, res, next);
};

export const logout = (req: Request, res: Response) => {
  req.logout();
  res.status(200).send();
};
