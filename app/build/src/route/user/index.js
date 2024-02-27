"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = __importDefault(require("./auth"));
const isUser_1 = __importDefault(require("../../middleware/isUser"));
const getCurrentUser_1 = __importDefault(require("../../controller/user/getCurrentUser"));
const userRouter = (0, express_1.Router)();
userRouter.use("/auth", auth_1.default);
userRouter.get("/get-current-user", isUser_1.default, getCurrentUser_1.default);
exports.default = userRouter;
//# sourceMappingURL=index.js.map