import { PrismaClient } from "@prisma/client";
import { NextFunction, Response, Request } from "express";
import { updateVerificationInfo } from "./register";
import { findUserByEmail } from "../../common";
import { validationResult } from "express-validator";

const ResendVerification = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email } = req.body;

  const error = validationResult(req);

  if (!error.isEmpty()) {
    return next({ status: 422, message: "Please enter valid inputs" });
  }

  const userRepo = new PrismaClient().user;

  try {
    // Check if the user exists
    const user = await findUserByEmail(email);

    if (!user) {
      return next({ status: 404, message: "User not found" });
    }

    // Check if the user is already verified
    if (user.isVerified) {
      return res.json({ message: "This user is already verified" });
    }

    // Generate a new verification code and update verification information
    const verificationCode = generateOtp();

    const otpExpiration = new Date(Date.now() + 5 * 60 * 1000);

    await updateVerificationInfo(email, verificationCode, otpExpiration);

    await sendVerificationEmail(email, verificationCode);

    return res.json({ message: "Verification code resent successfully" });
  } catch (error) {
    console.error("@user->resend-verification: ", error);
    next(error);
  }
};

const generateOtp = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

export default ResendVerification;
