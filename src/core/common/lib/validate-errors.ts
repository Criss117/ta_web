import { Prisma } from "@prisma/client";
import { CommonResponse } from "../models/types";
import {
  BadRequestException,
  ExeptionHandler,
} from "./errors/exeptions-handler";
import { AXIOS_ERROR_CODES, PRISMA_CODES } from "./errors/prisma-codes";
import HttpStatusCodes from "./http-status-code";
import { AxiosError } from "axios";

function validateError(error: any): CommonResponse {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    const prismaError = PRISMA_CODES.ERRORS.find(
      (err) => err.code === error.code
    );

    if (prismaError) {
      return BadRequestException.exeption(prismaError.message);
    }
  }

  if (error.cause && typeof error.cause === "string") {
    return ExeptionHandler.customException(
      HttpStatusCodes.BAD_REQUEST.code,
      error.cause
    );
  }

  if (error instanceof AxiosError && typeof error.code === "string") {
    const axiosError = Object.values(AXIOS_ERROR_CODES).find(
      (err) => err.code === error.code
    );

    return ExeptionHandler.customException(
      HttpStatusCodes.INTERNAL_SERVER_ERROR.code,
      axiosError?.message || "Hubo un error en el servidor"
    );
  }

  return ExeptionHandler.exeption();
}

export default validateError;
