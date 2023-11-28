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
const foodRepo = new client_1.PrismaClient().foods;
const ListFoods = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return next({ status: 422, message: "please pass valid inputs" });
    }
    try {
        const foods = yield foodRepo.findMany();
        console.log(foods);
        res.status(200).json({ message: "foods fetched successfully!", foods });
    }
    catch (error) {
        console.error("Error fetching foods:", error);
    }
});
exports.default = ListFoods;
//# sourceMappingURL=list-foods.js.map