import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { findUserByUid } from "../../common";

const GetCurrentUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { uid } = req.query as any;

  console.log(uid, "uiddd");

  const error = validationResult(req);
  if (!error.isEmpty()) {
    return next({ status: 422, message: "Please enter valid inputs" });
  }
  console.log("kooi");

  try {
    const user = await findUserByUid(uid);
    console.log(user, "user");

    res.status(200).json({ message: "this is the current user:", user });
  } catch (error) {
    console.error(error);
    return next({ status: 500, message: "Internal Server Error" });
  }
};

export default GetCurrentUser;
