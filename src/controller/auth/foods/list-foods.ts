import { PrismaClient } from "@prisma/client";
import { NextFunction, Response, Request } from "express";
import { validationResult } from "express-validator";
const foodRepo = new PrismaClient().foods;
const ListFoods = async (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next({ status: 422, message: "please pass valid inputs" });
  }

  try {
    const foods = await foodRepo.findMany();
    console.log(foods);
    res.status(200).json({ message: "foods fetched successfully!", foods });
  } catch (error) {
    console.error("Error fetching foods:", error);
  }
};

export default ListFoods;
