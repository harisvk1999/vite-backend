import { Router } from "express";
import authRouter from "./auth";
import isUser from "../../middleware/isUser";
import GetCurrentUser from "../../controller/user/getCurrentUser";

const userRouter = Router();

userRouter.use("/auth", authRouter);

userRouter.get("/get-current-user", isUser, GetCurrentUser);

export default userRouter;
