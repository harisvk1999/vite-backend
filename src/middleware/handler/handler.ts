import { NextFunction, Request, Response } from "express";

enum ErrorType {
  PRISMA_CLIENT_VALIDATION_ERROR = "PrismaClientValidationError",
  ERROR_CODE_P2002 = "P20082",
  ERROR_CODE_P2000 = "P2000",
  ERROR_CODE_P2025 = "P2025",
  ERROR_CODE_P2007 = "P2007",
  ERROR_CODE_P2011 = "P2011",
}

// Error handling middleware functionality
export const errorHandler = async (
  err: Error | any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let error = {
    message: (err as any)?.message?.message || (err as any).message,
    status: (err as any).status || 400,
  };
  switch (err.code) {
    case ErrorType.ERROR_CODE_P2002:
      error.message = "Unique Constraint Violation Error";
      error.status = (err as any).status || 409;
      break;
    case ErrorType.ERROR_CODE_P2000:
      error.message =
        "The provided value for the column is too long for the column’s type.";
      error.status = (err as any).status || 400;
      break;
    case ErrorType.ERROR_CODE_P2025:
      error.message =
        "An operation failed because it depends on one or more records that were required but not found";
      error.status = (err as any).status || 404;
      break;
    case ErrorType.ERROR_CODE_P2007:
      error.message = "Data validation error";
      error.status = (err as any) || 403;
      break;
    case ErrorType.ERROR_CODE_P2011:
      error.message = "Null constraint violation";
      error.status = (err as any) || 400;
      break;
  }

  if (err?.constructor?.name === ErrorType.PRISMA_CLIENT_VALIDATION_ERROR) {
    error = {
      message: "Please Enter Valid Inputs",
      status: error.status || 400,
    };
  }

  res.status(error.status).json(error);
};
