import { ZodError } from "zod";
import { IErrorSource, IGenericErrorResonse } from "../interface/errors";
import mongoose from "mongoose";

export const handleZodError = (err: ZodError): IGenericErrorResonse => {
  const errorSources = err.issues.map((issue): IErrorSource => {
    return {
      path: issue.path[issue.path.length - 1],
      message: issue.message,
    };
  });
  const statusCode = 400;

  return {
    statusCode,
    message: "Validation error!",
    errorSources,
  };
};

export const handleValidationError = (
  err: mongoose.Error.ValidationError
): IGenericErrorResonse => {
  const errorSources: IErrorSource[] = Object.values(err.errors).map(
    (
      val: mongoose.Error.ValidatorError | mongoose.Error.CastError
    ): IErrorSource => {
      return {
        path: val.path,
        message: val.message,
      };
    }
  );
  console.log(errorSources);
  const statusCode = 400;
  return {
    statusCode,
    message: "Validation failed!",
    errorSources,
  };
};

export const handleCastError = (
  err: mongoose.Error.CastError
): IGenericErrorResonse => {
  const errorSources: IErrorSource[] = [
    {
      path: err.path,
      message: err.message,
    },
  ];
  const statusCode = 400;
  return {
    statusCode,
    message: "Validation failed!",
    errorSources,
  };
};
