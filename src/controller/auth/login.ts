import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { findUserByEmail } from "../../common";
import bcryptjs from "bcryptjs";
import { createToken } from "../../utils/token.utils";
import { PrismaClient } from "@prisma/client";

const userRepo = new PrismaClient().user;

const Login = async (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);

  const nowDate = new Date();

  if (!errors.isEmpty()) {
    return next({ status: 422, message: "Please Enter valid inputs" });
  }

  const { email, password } = req.body;

  console.log(email, password, "hiii pppp");

  try {
    const user = await findUserByEmail(email);

    if (!user || !user.isVerified) {
      return next({
        status: 403,
        message: "user is not registerd ",
      });
    }

    const passwordCheck = await bcryptjs.compare(password, user.password);

    if (!passwordCheck) {
      return next({ status: 402, message: "password is incorrect" });
    }

    const token = createToken(user.uid);

    await userRepo.update({
      where: {
        email,
      },
      data: {
        lastLogin: nowDate,
      },
    });

    res.status(200).json({ token, message: "user logged succsesfully", user });
  } catch (error) {
    console.error("login:", error);
    next(error);
  }
};

export default Login;
