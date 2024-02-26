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
const express_validator_1 = require("express-validator");
const common_1 = require("../../common");
const GetCurrentUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { uid } = req.query;
    console.log(uid, "uiddd");
    const error = (0, express_validator_1.validationResult)(req);
    if (!error.isEmpty()) {
        return next({ status: 422, message: "Please enter valid inputs" });
    }
    console.log("kooi");
    try {
        const user = yield (0, common_1.findUserByUid)(uid);
        console.log(user, "user");
        res.status(200).json({ message: "this is the current user:", user });
    }
    catch (error) {
        console.error(error);
        return next({ status: 500, message: "Internal Server Error" });
    }
});
exports.default = GetCurrentUser;
//# sourceMappingURL=getCurrentUser.js.map