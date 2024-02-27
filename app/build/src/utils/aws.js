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
exports.sendVerificationEmail = void 0;
const aws_sdk_1 = __importDefault(require("aws-sdk"));
aws_sdk_1.default.config.credentials = {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
};
aws_sdk_1.default.config.region = "ap-south-1";
const ses = new aws_sdk_1.default.SES();
const sendVerificationEmail = (toEmail, verificationCode) => __awaiter(void 0, void 0, void 0, function* () {
    const params = {
        Destination: {
            ToAddresses: [toEmail],
        },
        Message: {
            Body: {
                Text: {
                    Data: `Your verification code is: ${verificationCode}`,
                },
            },
            Subject: {
                Data: "Email Verification - Your OTP",
            },
        },
        Source: "harisvkvvnr@gmail.com",
    };
    try {
        console.log(ses, "hiii ses");
        const result = yield ses.sendEmail(params).promise();
        console.log("Email sent:", result, "resultttt");
        return result;
    }
    catch (error) {
        console.error("Error sending email:", error);
        throw error;
    }
});
exports.sendVerificationEmail = sendVerificationEmail;
//# sourceMappingURL=aws.js.map