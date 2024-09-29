"use server";

import { CommonResponse } from "@Core/common/models/types";
import ClientEntity from "../../domain/entitites/client.entity";
import prisma from "@/lib/prisma";
import validateError from "@/core/common/lib/validate-errors";
import { BadRequestException } from "@/core/common/lib/errors/exeptions-handler";
import HttpStatusCodes from "@/core/common/lib/http-status-code";

async function settleDebtAction(
  clientId: number
): Promise<CommonResponse<ClientEntity | null>> {
  try {
    const res = await prisma.$transaction(async (tx) => {
      await tx.ticket.updateMany({
        where: {
          clientId,
          state: "PENDING",
          isActive: true,
        },
        data: {
          state: "PAID",
        },
      });

      const updatedClient = await tx.client.update({
        where: {
          id: clientId,
        },
        data: {
          balance: 0,
        },
      });

      return updatedClient;
    });

    if (!res) {
      return BadRequestException.exeption("No se encontro el cliente");
    }

    return {
      statusCode: HttpStatusCodes.OK.code,
      data: {
        ...res,
        tickets: null,
      },
    };
  } catch (error) {
    return validateError(error);
  }
}

export default settleDebtAction;
