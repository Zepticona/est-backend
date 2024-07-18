import { RequestHandler } from "express";
import { AnyZodObject } from "zod";

const validateRequest = function (schema: AnyZodObject): RequestHandler {
  return async function (req, res, next) {
    try {
      await schema.parseAsync({
        body: req.body,
      });

      next();
    } catch (err) {
      next(err);
    }
  };
};

export default validateRequest;
