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
exports.addNewSlot = void 0;
const express_validator_1 = require("express-validator");
const common_1 = require("../../common");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const date = new Date();
const addNewSlot = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return next({ status: 402, message: "Please enter valid inputs" });
        }
        const { biriyaniType, quantity, addOn, uid } = req.body;
        const user = yield (0, common_1.findUserByUid)(uid);
        if (!user) {
            return next({ status: 404, message: "User not found" });
        }
        // Create a new slot
        const newSlot = yield prisma.slot.create({
            data: {
                foodType: biriyaniType,
                quantity: quantity,
                addOn,
                userId: user.id,
            },
        });
        // Send the new slot as a response
        res.status(201).json({ slot: newSlot });
    }
    catch (error) {
        // Handle errors
        next(error);
    }
    finally {
        // Close Prisma client connection
        yield prisma.$disconnect();
    }
});
exports.addNewSlot = addNewSlot;
//# sourceMappingURL=add-new-slot.js.map