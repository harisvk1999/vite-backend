"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const isUser_1 = __importDefault(require("../../middleware/isUser"));
const list_foods_1 = __importDefault(require("../../controller/auth/foods/list-foods"));
const foodRouter = (0, express_1.default)();
foodRouter.get("/list-foods", isUser_1.default, list_foods_1.default);
exports.default = foodRouter;
//# sourceMappingURL=food.js.map