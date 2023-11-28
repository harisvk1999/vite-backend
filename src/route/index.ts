import { Router } from "express";
import userRouter from "./user";
import foodRouter from "./foods/food";
import { errorHandler } from "../middleware/handler/handler";

const router = Router();

router.get("/", (req, res) =>
  res.status(200).json({ message: "Welcome haris learn api " })
);

router.use("/user", userRouter);

router.use("/foods", foodRouter);

router.use(errorHandler);

export default router;
