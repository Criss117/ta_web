import { PRISMACODES } from "@/lib/constants/prisma-codes";
import { Prisma } from "@prisma/client";
import HttpStatusCodes, {
  BadRequestException,
  HttpError,
  InternalServerError,
} from "../errors/expetions";

export function validateCatchError(error: any) {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    const prismaError = PRISMACODES.ERRORS.find(
      (err) => err.code === error.code
    );

    if (prismaError) {
      return new BadRequestException(prismaError.code);
    }
  }

  if (error.cause) {
    return new HttpError(error.code);
  }

  return new InternalServerError(HttpStatusCodes.INTERNAL_SERVER_ERROR.code);
}
