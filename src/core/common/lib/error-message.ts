import { PRISMA_CODES } from "./errors/prisma-codes";
import HttpStatusCodes from "./http-status-code";

export function errorMessage(code: string) {
  const prismaMessage = PRISMA_CODES.ERRORS.find((err) => err.code === code);

  if (prismaMessage) {
    return prismaMessage.message;
  }

  const codeNumber = Number(code);

  if (!codeNumber) {
    return "Error in server";
  }

  const exeptionMessage = Object.values(HttpStatusCodes).find(
    (err) => err.code === codeNumber
  );

  if (exeptionMessage) {
    return exeptionMessage.description;
  }

  return "Error in server";
}
