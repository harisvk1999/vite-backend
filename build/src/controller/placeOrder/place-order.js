"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.placeOrder = void 0;
const express_validator_1 = require("express-validator");
const client_1 = require("@prisma/client");
const common_1 = require("../../common");
const prisma = new client_1.PrismaClient();
const placeOrder = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return next({ status: 400, message: "Please enter valid inputs" });
        }
        const orders = req.body;
        const userUid = orders[0].userUid;
        console.log(orders, "orders");
        const user = yield (0, common_1.findUserByUid)(userUid);
        if (!user) {
            return next({ status: 404, message: "User not found" });
        }
        const orderData = orders.map((order) => __awaiter(void 0, void 0, void 0, function* () {
            const { itemId, quantity } = order;
            // Fetch item details from the database
            const item = yield prisma.item.findUnique({
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
        }));
        // Use Promise.all to resolve the promises in the map
        const ordersResult = yield Promise.all(orderData);
        // Use prisma.order.createMany for bulk creation
        yield prisma.order.createMany({
            data: ordersResult,
        });
        return res
            .status(201)
            .json({ message: "Orders placed successfully", orders: ordersResult });
    }
    catch (error) {
        console.error("Error placing order:", error);
        next({ status: 500, message: "Internal server error" });
    }
});
exports.placeOrder = placeOrder;
//# sourceMappingURL=place-order.js.map