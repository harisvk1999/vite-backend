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
const client_1 = require("@prisma/client");
const common_1 = require("../../common");
const prisma = new client_1.PrismaClient();
const GetCartItems = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userUid = req.params.userUid;
        const user = yield (0, common_1.findUserByUid)(userUid);
        if (!user) {
            return next({ status: 404, message: "User not found" });
        }
        const cartItems = yield prisma.order.findMany({
            where: {
                userId: user.id,
                status: "pending",
            },
            include: {
                item: true,
            },
        });
        return res.status(200).json({ cartItems });
    }
    catch (error) {
        console.error("Error getting cart items:", error);
        next({ status: 500, message: "Internal server error" });
    }
});
exports.default = GetCartItems;
//# sourceMappingURL=getCartItems.js.map