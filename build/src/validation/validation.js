"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginValidation = exports.RegisterValidation = void 0;
const express_validator_1 = require("express-validator");
const RegisterValidation = () => [
    (0, express_validator_1.body)("name").trim().notEmpty(),
    (0, express_validator_1.body)("email").isEmail().notEmpty(),
    (0, express_validator_1.body)("password").notEmpty(),
];
exports.RegisterValidation = RegisterValidation;
const LoginValidation = () => [
    (0, express_validator_1.body)("email").trim().notEmpty(),
    (0, express_validator_1.body)("password").isLength({ min: 6 }),
];
exports.LoginValidation = LoginValidation;
//# sourceMappingURL=validation.js.map