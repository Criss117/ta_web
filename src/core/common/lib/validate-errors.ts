import { Prisma } from "@prisma/client";
import { CommonResponse } from "../models/types";
import {
  BadRequestException,
  ExeptionHandler,
} from "./errors/exeptions-handler";
import { PRISMA_CODES } from "./errors/prisma-codes";
import HttpStatusCodes from "./http-status-code";

function validateError(error: any): CommonResponse {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    const prismaError = PRISMA_CODES.ERRORS.find(
      (err) => err.code === error.code
    );

    if (prismaError) {
      return BadRequestException.exeption(prismaError.message);
    }
  }

  if (error.cause) {
    return ExeptionHandler.customException(
      HttpStatusCodes.BAD_REQUEST.code,
      error.cause
    );
  }

  return ExeptionHandler.exeption();
}

export default validateError;
