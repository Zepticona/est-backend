/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { ErrorRequestHandler } from "express";
import { ZodError } from "zod";
import { IErrorSource } from "../interface/errors";
import config from "../config";
import {
  handleCastError,
  handleValidationError,
  handleZodError,
} from "../errors/errorHandler";

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let statusCode = 500;
  let message = err.message || "Something went wrong!";

  let errorSources: IErrorSource[] = [
    {
      path: "",
      message: "Something went wrong!",
    },
  ];

  if (err instanceof ZodError) {
    const simplifiedErr = handleZodError(err);
    statusCode = simplifiedErr.statusCode;
    message = simplifiedErr.message;
    errorSources = simplifiedErr.errorSources;
  } else if (err?.name === "ValidationError") {
    const simplifiedErr = handleValidationError(err);

    statusCode = simplifiedErr.statusCode;
    message = simplifiedErr.message;
    errorSources = simplifiedErr.errorSources;
  } else if (err?.name === "CastError") {
    const simplifiedErr = handleCastError(err);

    statusCode = simplifiedErr.statusCode;
    message = simplifiedErr.message;
    errorSources = simplifiedErr.errorSources;
  }

  return res.status(statusCode).json({
    success: false,
    message: message,
    errorSource: errorSources,
    //err: err,
    stack: config.NODE_ENV === "development" ? err?.stack : null,
  });
};

export default globalErrorHandler;
