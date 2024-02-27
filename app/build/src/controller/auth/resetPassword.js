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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const express_validator_1 = require("express-validator");
const ResetPassword = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, verificationCode, newPassword } = req.body;
    const error = (0, express_validator_1.validationResult)(req);
    if (!error.isEmpty()) {
        return next({ status: 422, message: "Please enter valid inputs" });
    }
    const userRepo = new client_1.PrismaClient().user;
    const verificationRepo = new client_1.PrismaClient().verification;
    try {
        const verificationInfo = yield verificationRepo.findFirst({
            where: {
                user: {
                    email,
                },
                otp: verificationCode,
                expiration: {
                    gte: new Date(),
                },
            },
        });
        if (!verificationInfo) {
            return next({
                staus: 422,
                message: "Invalid or expired verification code",
            });
        }
        const hashPassword = yield bcryptjs_1.default.hash(newPassword, 10);
        yield userRepo.update({
            where: {
                email: email,
            },
            data: {
                password: hashPassword,
            },
        });
        return res.status(200).json({ message: "password reseted succesfully" });
    }
    catch (error) { }
});
exports.default = ResetPassword;
//# sourceMappingURL=resetPassword.js.map