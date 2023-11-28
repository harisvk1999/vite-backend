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
const token_utils_1 = require("../utils/token.utils");
const common_1 = require("../common");
const handler_1 = require("./handler/handler");
const isUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { authorization } = req.headers;
    try {
        if (!authorization) {
            throw new Error("your not authorized");
        }
        const token = authorization.split("Bearer")[1].trim();
        const { uid, expired } = (0, token_utils_1.verifyToken)(token);
        if (expired || !uid) {
            throw new Error("You are not authorized");
        }
        const user = yield (0, common_1.findUserByUid)(uid);
        req.body.session = {
            user: user,
        };
        next();
    }
    catch (error) {
        console.error("@middleware->is-admin:", error);
        (0, handler_1.errorHandler)({ message: error, status: 401 }, req, res, next);
    }
});
exports.default = isUser;
//# sourceMappingURL=isUser.js.map