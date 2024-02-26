import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../utils/token.utils";
import { findUserByUid } from "../common";
import { errorHandler } from "./handler/handler";

const isUser = async (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  console.log(authorization, "authorization");

  try {
    if (!authorization) {
      throw new Error("your not authorized");
    }
    const token = authorization.split("Bearer")[1].trim();

    const { uid, expired } = verifyToken(token);

    if (expired || !uid) {
      throw new Error("You are not authorized");
    }

    const user = await findUserByUid(uid);

    req.body.session = {
      user: user,
    };

    next();
  } catch (error) {
    console.error("@middleware->is-admin:", error);
    errorHandler({ message: error, status: 401 }, req, res, next);
  }
};

export default isUser;
