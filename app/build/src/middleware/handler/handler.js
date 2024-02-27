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
exports.errorHandler = void 0;
var ErrorType;
(function (ErrorType) {
    ErrorType["PRISMA_CLIENT_VALIDATION_ERROR"] = "PrismaClientValidationError";
    ErrorType["ERROR_CODE_P2002"] = "P20082";
    ErrorType["ERROR_CODE_P2000"] = "P2000";
    ErrorType["ERROR_CODE_P2025"] = "P2025";
    ErrorType["ERROR_CODE_P2007"] = "P2007";
    ErrorType["ERROR_CODE_P2011"] = "P2011";
})(ErrorType || (ErrorType = {}));
// Error handling middleware functionality
const errorHandler = (err, req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    let error = {
        message: ((_a = err === null || err === void 0 ? void 0 : err.message) === null || _a === void 0 ? void 0 : _a.message) || err.message,
        status: err.status || 400,
    };
    switch (err.code) {
        case ErrorType.ERROR_CODE_P2002:
            error.message = "Unique Constraint Violation Error";
            error.status = err.status || 409;
            break;
        case ErrorType.ERROR_CODE_P2000:
            error.message =
                "The provided value for the column is too long for the column’s type.";
            error.status = err.status || 400;
            break;
        case ErrorType.ERROR_CODE_P2025:
            error.message =
                "An operation failed because it depends on one or more records that were required but not found";
            error.status = err.status || 404;
            break;
        case ErrorType.ERROR_CODE_P2007:
            error.message = "Data validation error";
            error.status = err || 403;
            break;
        case ErrorType.ERROR_CODE_P2011:
            error.message = "Null constraint violation";
            error.status = err || 400;
            break;
    }
    if (((_b = err === null || err === void 0 ? void 0 : err.constructor) === null || _b === void 0 ? void 0 : _b.name) === ErrorType.PRISMA_CLIENT_VALIDATION_ERROR) {
        error = {
            message: "Please Enter Valid Inputs",
            status: error.status || 400,
        };
    }
    res.status(error.status).json(error);
});
exports.errorHandler = errorHandler;
//# sourceMappingURL=handler.js.map