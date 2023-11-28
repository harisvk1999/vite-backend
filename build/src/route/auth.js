"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validation_1 = require("../validation/validation");
const register_1 = __importDefault(require("../controller/auth/register"));
const login_1 = __importDefault(require("../controller/auth/login"));
const authRouter = (0, express_1.Router)();
authRouter.post("/register", (0, validation_1.RegisterValidation)(), register_1.default);
authRouter.post("/login", (0, validation_1.LoginValidation)(), login_1.default);
exports.default = authRouter;
//# sourceMappingURL=auth.js.map