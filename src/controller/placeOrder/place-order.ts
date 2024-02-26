import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import { PrismaClient } from "@prisma/client";
import { findUserByUid } from "../../common";

const prisma = new PrismaClient();

interface Iorder {
  itemId: number;
  quantity: number;
  userUid: string;
}

export const placeOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next({ status: 400, message: "Please enter valid inputs" });
    }

    const orders = req.body as Iorder[];
    const userUid = orders[0].userUid;

    console.log(orders, "orders");

    const user = await findUserByUid(userUid);

    if (!user) {
      return next({ status: 404, message: "User not found" });
    }

    const orderData = orders.map(async (order) => {
      const { itemId, quantity } = order;

      // Fetch item details from the database
      const item = await prisma.item.findUnique({
        where: { id: itemId },
      });

      if (!item) {
        return next({
          status: 404,
          message: `Item with ID ${itemId} not found`,
        });
      }

      return {
        itemId: item.id,
        userId: user.id,
        totalPrice: item.price * quantity,
        status: "pending",
        quantity,
        unitPrice: item.price,
      };
    });

    // Use Promise.all to resolve the promises in the map
    const ordersResult = await Promise.all(orderData);

    // Use prisma.order.createMany for bulk creation
    await prisma.order.createMany({
      data: ordersResult as any,
    });

    return res
      .status(201)
      .json({ message: "Orders placed successfully", orders: ordersResult });
  } catch (error) {
    console.error("Error placing order:", error);
    next({ status: 500, message: "Internal server error" });
  }
};
