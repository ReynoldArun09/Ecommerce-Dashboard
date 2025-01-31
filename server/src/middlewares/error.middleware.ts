import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { ErrorRequestHandler, Response } from "express";
import { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";
import { z, ZodError } from "zod";
import { CustomError } from "../utils/custom.error";

const formatZodError = (res: Response, error: z.ZodError) => {
  const errors = error?.issues?.map((err) => ({
    field: err.path.join("."),
    message: err.message,
  }));
  return res.status(400).json({
    message: "Validation failed",
    errors: errors,
    statusCode: error.message || "Unknown error occurred",
  });
};

// middleware for handling errors globally
export const ErrorHandler: ErrorRequestHandler = (
  error,
  req,
  res,
  next
): any => {
  console.error(`Error Occured on PATH: ${req.path} `, error?.message);

  //json syntax error
  if (error instanceof SyntaxError) {
    return res.status(400).json({
      message: "Invalid JSON format. Please check your request body.",
    });
  }

  // handles zod validation error
  if (error instanceof ZodError) {
    return formatZodError(res, error);
  }

  // custom error
  if (error instanceof CustomError) {
    return res.status(error.statusCode).json({
      message: error.message,
      statusCode: error.statusCode,
    });
  }
  // Handle JWT Errors (invalid or expired token)
  if (error instanceof JsonWebTokenError) {
    return res.status(401).json({
      message: "Invalid JWT Token. Please provide a valid token.",
    });
  }

  if (error instanceof TokenExpiredError) {
    return res.status(401).json({
      message: "JWT Token has expired. Please log in again.",
    });
  }
  // prisma duplicate error
  if (
    error instanceof PrismaClientKnownRequestError &&
    error.code === "P2002"
  ) {
    return res.status(400).json({
      message: `Duplicate Email/ID' is already in use.`,
    });
  }
  return res.status(500).json({
    message: "Internal Server Error",
  });
};
