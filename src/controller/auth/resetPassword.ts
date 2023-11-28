import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response } from "express";

import bcryptjs from "bcryptjs";
import { validationResult } from "express-validator";

const ResetPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, verificationCode, newPassword } = req.body;

  const error = validationResult(req);

  if (!error.isEmpty()) {
    return next({ status: 422, message: "Please enter valid inputs" });
  }

  const userRepo = new PrismaClient().user;

  const verificationRepo = new PrismaClient().verification;

  try {
    const verificationInfo = await verificationRepo.findFirst({
      where: {
        user: {
          email,
        },
        otp: verificationCode,
        expiration: {
          gte: new Date(),
        },
      },
    });

    if (!verificationInfo) {
      return next({
        staus: 422,
        message: "Invalid or expired verification code",
      });
    }

    const hashPassword = await bcryptjs.hash(newPassword, 10);

    await userRepo.update({
      where: {
        email: email,
      },
      data: {
        password: hashPassword,
      },
    });

    return res.status(200).json({ message: "password reseted succesfully" });
  } catch (error) {}
};

export default ResetPassword;
