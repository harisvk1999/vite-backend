import { NextFunction, Response, Request } from "express";
import { Prisma, PrismaClient } from "@prisma/client";
import { findUserByUid } from "../../common";

const prisma = new PrismaClient();

const GetCartItems = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userUid = req.params.userUid;

    const user = await findUserByUid(userUid);

    if (!user) {
      return next({ status: 404, message: "User not found" });
    }

    const cartItems = await prisma.order.findMany({
      where: {
        userId: user.id,
        status: "pending",
      },
      include: {
        item: true,
      },
    });

    return res.status(200).json({ cartItems });
  } catch (error) {
    console.error("Error getting cart items:", error);
    next({ status: 500, message: "Internal server error" });
  }
};

export default GetCartItems;
