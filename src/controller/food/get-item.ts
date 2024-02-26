import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const GetItem = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return next({ status: 422, message: "Please Enter valid inputs" });
    }

    // Assuming you want to retrieve all items from the database
    const items = await prisma.item.findMany();

    res.status(200).json({ items });
  } catch (error) {
    console.error(error);
    next({ status: 500, message: "Internal server error" });
  } finally {
    // Close Prisma client connection
    await prisma.$disconnect();
  }
};
