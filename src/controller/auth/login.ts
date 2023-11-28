import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { findUserByEmail } from "../../common";
import bcryptjs from "bcryptjs";
import { createToken } from "../../utils/token.utils";

const Login = async (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next({ status: 422, message: "Please Enter valid inputs" });
  }

  const { email, password } = req.body;

  console.log(email, password, "hiii pppp");

  try {
    const user = await findUserByEmail(email);

    if (!user) {
      return next({
        status: 403,
        message: "user name or password is incorrect",
      });
    }

    const passwordCheck = await bcryptjs.compare(password, user.password);

    if (!passwordCheck) {
      return next({ status: 402, message: "password is incorrect" });
    }

    const token = createToken(user.uid);

    res.status(200).json({ token, message: "user logged succsesfully", user });
  } catch (error) {
    console.error("login:", error);
    next(error);
  }
};

export default Login;
