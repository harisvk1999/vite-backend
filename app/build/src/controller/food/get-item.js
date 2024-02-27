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
exports.GetItem = void 0;
const express_validator_1 = require("express-validator");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const GetItem = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return next({ status: 422, message: "Please Enter valid inputs" });
        }
        // Assuming you want to retrieve all items from the database
        const items = yield prisma.item.findMany();
        res.status(200).json({ items });
    }
    catch (error) {
        console.error(error);
        next({ status: 500, message: "Internal server error" });
    }
    finally {
        // Close Prisma client connection
        yield prisma.$disconnect();
    }
});
exports.GetItem = GetItem;
//# sourceMappingURL=get-item.js.map