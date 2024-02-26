import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import { findUserByEmail } from "../../common";
import { validationResult } from "express-validator";

const verificationRepo = new PrismaClient().verification;

const userRepo = new PrismaClient().user;

const verifyOtp = async (req: Request, res: Response, next: NextFunction) => {
  const error = validationResult(req);

  if (!error.isEmpty()) {
    return next({ status: 422, message: "Please enter valid inputs" });
  }
  const { email, verificationCode } = req.body as any;

  console.log(req.body, "hiiiii body");

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
      return res
        .status(422)
        .json({ message: "Invalid or expired verification code" });
    }

    // Mark user as verified
    await userRepo.update({
      where: {
        email,
      },
      data: {
        isVerified: true,
      },
    });

    // // Optionally, you can delete the verification record since it's no longer needed
    // await prisma.verification.delete({
    //   where: {
    //     id: verificationInfo.id,
    //   },
    // });

    return res.json({ message: "Email verification successful" });
  } catch (error) {
    console.error("@admin->verify-otp: ", error);
    next(error);
  }
};

export default verifyOtp;
