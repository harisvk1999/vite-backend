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
const register_1 = require("./register");
const common_1 = require("../../common");
const express_validator_1 = require("express-validator");
const aws_1 = require("../../utils/aws");
const SendResetPasswordCode = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userRepo = new client_1.PrismaClient().user;
    const { email } = req.body;
    const error = (0, express_validator_1.validationResult)(req);
    if (!error.isEmpty()) {
        return next({ status: 422, message: "Please enter valid inputs" });
    }
    try {
        const validEmail = (0, register_1.isvalidEmail)(email);
        if (!validEmail) {
            return next({ status: 422, message: "Please enter valid email address" });
        }
        const user = yield (0, common_1.findUserByEmail)(email);
        if (!user || !user.isVerified) {
            return next({
                status: 422,
                message: "this email is not register please register first",
            });
        }
        const otpCode = (0, register_1.generateOtp)();
        const otpExpiration = new Date(Date.now() + 5 * 60 * 1000);
        yield (0, aws_1.sendVerificationEmail)(email, otpCode);
        yield (0, register_1.updateVerificationInfo)(email, otpCode, otpExpiration);
        return res
            .status(200)
            .json({ message: "password reset code sended succes fully" });
    }
    catch (error) {
        console.error("@user->resetPasswordCode: ", error);
        next(error);
    }
});
exports.default = SendResetPasswordCode;
//# sourceMappingURL=sendResetPassword.js.map