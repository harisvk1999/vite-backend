"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validation_1 = require("../../validation/validation");
const register_1 = __importDefault(require("../../controller/auth/register"));
const login_1 = __importDefault(require("../../controller/auth/login"));
const VerifyOtp_1 = __importDefault(require("../../controller/auth/VerifyOtp"));
const resendOtp_1 = __importDefault(require("../../controller/auth/resendOtp"));
const sendResetPassword_1 = __importDefault(require("../../controller/auth/sendResetPassword"));
const resetPassword_1 = __importDefault(require("../../controller/auth/resetPassword"));
const authRouter = (0, express_1.Router)();
authRouter.post("/register", (0, validation_1.RegisterValidation)(), register_1.default);
authRouter.post("/login", (0, validation_1.LoginValidation)(), login_1.default);
authRouter.post("/verify-otp", VerifyOtp_1.default);
authRouter.post("/resend-otp", resendOtp_1.default);
authRouter.post("/send-reset-password-code", sendResetPassword_1.default);
authRouter.post("/reset-password", resetPassword_1.default);
exports.default = authRouter;
//# sourceMappingURL=auth.js.map