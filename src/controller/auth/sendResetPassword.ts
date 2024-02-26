import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import { generateOtp, isvalidEmail, updateVerificationInfo } from "./register";
import { findUserByEmail } from "../../common";
import { validationResult } from "express-validator";
import { sendVerificationEmail } from "../../utils/aws";

const SendResetPasswordCode = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userRepo = new PrismaClient().user;
  const { email } = req.body;

  const error = validationResult(req);

  if (!error.isEmpty()) {
    return next({ status: 422, message: "Please enter valid inputs" });
  }

  try {
    const validEmail = isvalidEmail(email);

    if (!validEmail) {
      return next({ status: 422, message: "Please enter valid email address" });
    }

    const user = await findUserByEmail(email);

    if (!user || !user.isVerified) {
      return next({
        status: 422,
        message: "this email is not register please register first",
      });
    }

    const otpCode = generateOtp();

    const otpExpiration = new Date(Date.now() + 5 * 60 * 1000);

    await sendVerificationEmail(email, otpCode);

    await updateVerificationInfo(email, otpCode, otpExpiration);

    return res
      .status(200)
      .json({ message: "password reset code sended succes fully" });
  } catch (error) {
    console.error("@user->resetPasswordCode: ", error);
    next(error);
  }
};

export default SendResetPasswordCode;
