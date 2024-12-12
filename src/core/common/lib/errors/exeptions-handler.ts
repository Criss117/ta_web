import { CommonResponse } from "../../models/types";
import HttpStatusCodes from "../http-status-code";

export abstract class ExeptionHandler {
  static exeption(msg?: string): CommonResponse {
    return {
      statusCode: HttpStatusCodes.INTERNAL_SERVER_ERROR.code,
      error: msg || HttpStatusCodes.INTERNAL_SERVER_ERROR.description,
    };
  }

  static customException(code: number, msg?: string): CommonResponse {
    return {
      statusCode: code,
      error: msg || HttpStatusCodes.INTERNAL_SERVER_ERROR.description,
    };
  }
}

export class BadRequestException extends ExeptionHandler {
  static exeption(msg?: string): CommonResponse {
    return {
      statusCode: HttpStatusCodes.BAD_REQUEST.code,
      error: msg || HttpStatusCodes.BAD_REQUEST.description,
    };
  }
}

export class NotFoundException extends ExeptionHandler {
  static exeption(msg?: string): CommonResponse {
    return {
      statusCode: HttpStatusCodes.NOT_FOUND.code,
      error: msg || HttpStatusCodes.NOT_FOUND.description,
    };
  }
}
