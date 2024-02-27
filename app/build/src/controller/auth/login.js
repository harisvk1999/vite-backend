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
const express_validator_1 = require("express-validator");
const common_1 = require("../../common");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const token_utils_1 = require("../../utils/token.utils");
const client_1 = require("@prisma/client");
const userRepo = new client_1.PrismaClient().user;
const Login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    const nowDate = new Date();
    if (!errors.isEmpty()) {
        return next({ status: 422, message: "Please Enter valid inputs" });
    }
    const { email, password } = req.body;
    console.log(email, password, "hiii pppp");
    try {
        const user = yield (0, common_1.findUserByEmail)(email);
        if (!user || !user.isVerified) {
            return next({
                status: 403,
                message: "user is not registerd ",
            });
        }
        const passwordCheck = yield bcryptjs_1.default.compare(password, user.password);
        if (!passwordCheck) {
            return next({ status: 402, message: "password is incorrect" });
        }
        const token = (0, token_utils_1.createToken)(user.uid);
        yield userRepo.update({
            where: {
                email,
            },
            data: {
                lastLogin: nowDate,
            },
        });
        res.status(200).json({ token, message: "user logged succsesfully", user });
    }
    catch (error) {
        console.error("login:", error);
        next(error);
    }
});
exports.default = Login;
//# sourceMappingURL=login.js.map