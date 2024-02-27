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
const ResendVerification = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    const error = (0, express_validator_1.validationResult)(req);
    if (!error.isEmpty()) {
        return next({ status: 422, message: "Please enter valid inputs" });
    }
    const userRepo = new client_1.PrismaClient().user;
    try {
        // Check if the user exists
        const user = yield (0, common_1.findUserByEmail)(email);
        if (!user) {
            return next({ status: 404, message: "User not found" });
        }
        // Check if the user is already verified
        if (user.isVerified) {
            return res.json({ message: "This user is already verified" });
        }
        // Generate a new verification code and update verification information
        const verificationCode = generateOtp();
        const otpExpiration = new Date(Date.now() + 5 * 60 * 1000);
        yield (0, register_1.updateVerificationInfo)(email, verificationCode, otpExpiration);
        yield (0, aws_1.sendVerificationEmail)(email, verificationCode);
        return res.json({ message: "Verification code resent successfully" });
    }
    catch (error) {
        console.error("@user->resend-verification: ", error);
        next(error);
    }
});
const generateOtp = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};
exports.default = ResendVerification;
//# sourceMappingURL=resendOtp.js.map