"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const getHistory_1 = require("../../controller/history/getHistory");
const place_order_1 = require("../../controller/placeOrder/place-order");
const get_item_1 = require("../../controller/food/get-item");
const foodRouter = (0, express_1.default)();
foodRouter.post("/palace-order", place_order_1.placeOrder);
foodRouter.get("/get-history", getHistory_1.getHistory);
foodRouter.get("/get-all-items", get_item_1.GetItem);
exports.default = foodRouter;
//# sourceMappingURL=food.js.map