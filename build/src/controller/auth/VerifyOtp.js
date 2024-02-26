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
const express_validator_1 = require("express-validator");
const verificationRepo = new client_1.PrismaClient().verification;
const userRepo = new client_1.PrismaClient().user;
const verifyOtp = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const error = (0, express_validator_1.validationResult)(req);
    if (!error.isEmpty()) {
        return next({ status: 422, message: "Please enter valid inputs" });
    }
    const { email, verificationCode } = req.body;
    console.log(req.body, "hiiiii body");
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
            return res
                .status(422)
                .json({ message: "Invalid or expired verification code" });
        }
        // Mark user as verified
        yield userRepo.update({
            where: {
                email,
            },
            data: {
                isVerified: true,
            },
        });
        // // Optionally, you can delete the verification record since it's no longer needed
        // await prisma.verification.delete({
        //   where: {
        //     id: verificationInfo.id,
        //   },
        // });
        return res.json({ message: "Email verification successful" });
    }
    catch (error) {
        console.error("@admin->verify-otp: ", error);
        next(error);
    }
});
exports.default = verifyOtp;
//# sourceMappingURL=VerifyOtp.js.map