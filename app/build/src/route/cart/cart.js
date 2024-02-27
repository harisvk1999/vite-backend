"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const getCartItems_1 = __importDefault(require("../../controller/orderCart/getCartItems"));
const cartRouter = (0, express_1.default)();
cartRouter.get("/get-cart-items", getCartItems_1.default);
exports.default = cartRouter;
//# sourceMappingURL=cart.js.map