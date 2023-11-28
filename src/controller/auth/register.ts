import { PrismaClient } from "@prisma/client";
import { validationResult } from "express-validator";
import { isValidPassword } from "../../constants";
import { findUserByEmail } from "../../common";
import bcryptjs from "bcryptjs";
import { RegisterUserInput } from "../../types";
import { NextFunction, Request, Response } from "express-serve-static-core";

interface IBody {
  email: string;
  name: string;
  password: string;
}

const userRepo = new PrismaClient().user;

const verificationRepo = new PrismaClient().verification;

const Register = async (req: Request, res: Response, next: NextFunction) => {
  const error = validationResult(req);

  if (!error.isEmpty()) {
    return next({ status: 422, message: "Please enter valid inputs" });
  }

  const { email, name, password }: IBody = req.body;

  try {
    const validEmail = await isvalidEmail(email);

    if (!validEmail) {
      return next({ status: 422, message: "please enter valid email" });
    }

    const validPassword = await isValidPassword(password);

    if (!validPassword) {
      return next({ status: 422, message: "please enter valid password" });
    }

    const user = await findUserByEmail(email);

    const hashPassword = await bcryptjs.hash(password, 10);

    if (user && user.email && user.isVerified) {
      return next({
        status: 422,
        message: "this email is alredy registerd  try with another ",
      });
    } else if (user && user.email && !user.isVerified) {
      const verificationCode = generateOtp();
      const otpExpiration = new Date(Date.now() + 5 * 60 * 1000);

      await updateVerificationInfo(email, verificationCode, otpExpiration);

      await sendVerificationEmail(email, verificationCode);
    } else {
      const verifiCationCode = generateOtp();

      const otpExpiration = new Date(Date.now() + 5 * 60 * 1000);

      await storeVerificationInfo(email, verifiCationCode, otpExpiration);

      await sendVerificationEmail(email, verifiCationCode);

      await handleFirstRegister({ email, name, hashPassword });
    }

    return res.json({ message: "user added sucessfully" });
  } catch (error) {
    console.error("@user->register: ", error);
    next(error);
  }
};

export const isvalidEmail = async (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const handleFirstRegister = async (input: RegisterUserInput) => {
  const { name, email, hashPassword } = input;

  await userRepo.create({
    data: {
      name,
      email,
      password: hashPassword,
      isVerified: false,
    },
  });
};

const storeVerificationInfo = async (
  email: string,
  otp: string,
  expiration: Date
) => {
  // Create a new verification record
  await verificationRepo.create({
    data: {
      user: {
        connect: { email },
      },
      otp,
      expiration,
    },
  });
};

export const updateVerificationInfo = async (
  email: string,
  otp: string,
  expiration: Date
) => {
  const existingVerification = await verificationRepo.findFirst({
    where: {
      user: {
        email,
      },
    },
  });

  await verificationRepo.update({
    where: {
      id: existingVerification.id,
    },
    data: {
      otp,
      expiration,
    },
  });
};

export const generateOtp = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

export default Register;
