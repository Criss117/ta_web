import { Prisma } from "@prisma/client";
import { CommonResponse } from "../models/types";
import {
  BadRequestException,
  ExeptionHandler,
} from "./errors/exeptions-handler";
import { PRISMA_CODES } from "./errors/prisma-codes";

function validateError(error: any): CommonResponse {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    const prismaError = PRISMA_CODES.ERRORS.find(
      (err) => err.code === error.code
    );

    console.log({ prismaError });

    if (prismaError) {
      return BadRequestException.exeption(prismaError.message);
    }
  }

  if (error.cause) {
    return ExeptionHandler.customException(error.code, error.cause);
  }

  return ExeptionHandler.exeption();
}

export default validateError;
