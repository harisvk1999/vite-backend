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
exports.findUserByUid = exports.findUserByEmail = void 0;
const client_1 = require("@prisma/client");
const userRepo = new client_1.PrismaClient().user;
const findUserByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(userRepo, "hiiiiii");
    return yield userRepo.findUnique({
        where: {
            email: email,
        },
    });
});
exports.findUserByEmail = findUserByEmail;
const findUserByUid = (uid) => __awaiter(void 0, void 0, void 0, function* () {
    return yield userRepo.findFirst({
        where: {
            uid,
        },
    });
});
exports.findUserByUid = findUserByUid;
//# sourceMappingURL=common.js.map