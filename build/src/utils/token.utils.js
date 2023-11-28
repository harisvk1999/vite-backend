"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.createToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT = {
    jwt: process.env.JWT_SECRET,
    jwtExp: "6h",
};
const createToken = (uid) => {
    return jsonwebtoken_1.default.sign({ uid }, JWT.jwt, {
        expiresIn: JWT.jwtExp,
    });
};
exports.createToken = createToken;
const verifyToken = (token) => {
    const now = Date.now() / 1000;
    const data = jsonwebtoken_1.default.verify(token, JWT.jwt);
    return {
        uid: data.uid,
        expired: now >= data.exp,
    };
};
exports.verifyToken = verifyToken;
//# sourceMappingURL=token.utils.js.map