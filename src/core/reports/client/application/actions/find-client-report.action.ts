"use server";

import validateError from "@/core/common/lib/validate-errors";
import { ClientReportUseCasesFactory } from "../../composition-root/client-report.usecases.factory";
import { CommonResponse } from "@/core/common/models/types";
import { ClientReportPrimitive } from "../../domain/entities/client-report.entity";
import { sleep } from "@/lib/utils";

const findClientReportUseCase =
  ClientReportUseCasesFactory.createFindClientReport();

export async function findClientReportAction(
  ccNumber: string
): Promise<CommonResponse<ClientReportPrimitive | null>> {
  try {
    const executed = await findClientReportUseCase.execute(ccNumber);

    if (!executed) {
      return {
        statusCode: 404,
        error: "No se encontro el cliente",
      };
    }

    return {
      statusCode: 200,
      data: executed.toValue(),
    };
  } catch (error) {
    return validateError(error);
  }
}
