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
exports.generateOtp = exports.updateVerificationInfo = exports.isvalidEmail = void 0;
const client_1 = require("@prisma/client");
const express_validator_1 = require("express-validator");
const constants_1 = require("../../constants");
const common_1 = require("../../common");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const aws_1 = require("../../utils/aws");
const userRepo = new client_1.PrismaClient().user;
const verificationRepo = new client_1.PrismaClient().verification;
const Register = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const error = (0, express_validator_1.validationResult)(req);
    if (!error.isEmpty()) {
        return next({ status: 422, message: "Please enter valid inputs" });
    }
    const { email, name, password } = req.body;
    try {
        const validEmail = yield (0, exports.isvalidEmail)(email);
        if (!validEmail) {
            return next({ status: 422, message: "please enter valid email" });
        }
        const validPassword = yield (0, constants_1.isValidPassword)(password);
        if (!validPassword) {
            return next({ status: 422, message: "please enter valid password" });
        }
        const user = yield (0, common_1.findUserByEmail)(email);
        const hashPassword = yield bcryptjs_1.default.hash(password, 10);
        if (user && user.email && user.isVerified) {
            return next({
                status: 422,
                message: "this email is alredy registerd  try with another ",
            });
        }
        else if (user && user.email && !user.isVerified) {
            const verificationCode = (0, exports.generateOtp)();
            const otpExpiration = new Date(Date.now() + 5 * 60 * 1000);
            yield (0, exports.updateVerificationInfo)(email, verificationCode, otpExpiration);
            yield (0, aws_1.sendVerificationEmail)(email, verificationCode);
        }
        else {
            const verifiCationCode = (0, exports.generateOtp)();
            const otpExpiration = new Date(Date.now() + 5 * 60 * 1000);
            yield handleFirstRegister({ email, name, hashPassword });
            yield (0, aws_1.sendVerificationEmail)(email, verifiCationCode);
            yield storeVerificationInfo(email, verifiCationCode, otpExpiration);
        }
        return res.json({ message: "user added sucessfully" });
    }
    catch (error) {
        console.error("@user->register: ", error);
        next(error);
    }
});
const isvalidEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
});
exports.isvalidEmail = isvalidEmail;
const handleFirstRegister = (input) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, hashPassword } = input;
    yield userRepo.create({
        data: {
            name,
            email,
            password: hashPassword,
            isVerified: false,
        },
    });
});
const storeVerificationInfo = (email, otp, expiration) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield (0, common_1.findUserByEmail)(email);
    if (!user) {
        return console.error("user is not enterd to register table");
    }
    // Create a new verification record
    yield verificationRepo.create({
        data: {
            user: {
                connect: { email },
            },
            otp,
            expiration,
        },
    });
});
const updateVerificationInfo = (email, otp, expiration) => __awaiter(void 0, void 0, void 0, function* () {
    const existingVerification = yield verificationRepo.findFirst({
        where: {
            user: {
                email,
            },
        },
    });
    yield verificationRepo.update({
        where: {
            id: existingVerification.id,
        },
        data: {
            otp,
            expiration,
        },
    });
});
exports.updateVerificationInfo = updateVerificationInfo;
const generateOtp = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};
exports.generateOtp = generateOtp;
exports.default = Register;
//# sourceMappingURL=register.js.map