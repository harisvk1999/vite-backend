import { body } from "express-validator";

export const RegisterValidation = () => [
  body("name").trim().notEmpty(),
  body("email").isEmail().notEmpty(),
  body("password").notEmpty(),
];

export const LoginValidation = () => [
  body("email").trim().notEmpty(),
  body("password").isLength({ min: 6 }),
];
