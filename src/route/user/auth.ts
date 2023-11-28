import { Router } from "express";
import {
  LoginValidation,
  RegisterValidation,
} from "../../validation/validation";
import Register from "../../controller/auth/register";
import Login from "../../controller/auth/login";
import verifyOtp from "../../controller/auth/VerifyOtp";
import ResendVerification from "../../controller/auth/resendOtp";

import SendResetPasswordCode from "../../controller/auth/sendResetPassword";
import ResetPassword from "../../controller/auth/resetPassword";

const authRouter = Router();

authRouter.post("/register", RegisterValidation(), Register);

authRouter.post("/login", LoginValidation(), Login);

authRouter.post("/verify-otp", verifyOtp);

authRouter.post("/resend-otp", ResendVerification);

authRouter.post("/send-reset-password-code", SendResetPasswordCode);

authRouter.post("/reset-password", ResetPassword);

export default authRouter;
