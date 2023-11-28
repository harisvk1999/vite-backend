"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = __importDefault(require("./user"));
const food_1 = __importDefault(require("./foods/food"));
const handler_1 = require("../middleware/handler/handler");
const router = (0, express_1.Router)();
router.get("/", (req, res) => res.status(200).json({ message: "Welcome haris learn api " }));
router.use("/user", user_1.default);
router.use("/foods", food_1.default);
router.use(handler_1.errorHandler);
exports.default = router;
//# sourceMappingURL=index.js.map