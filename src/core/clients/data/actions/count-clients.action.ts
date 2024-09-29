"use server";

import { Prisma } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";

import prisma from "@/lib/prisma";

import { CommonResponse } from "@Core/common/models/types";
import { BadRequestException } from "@/core/common/lib/errors/exeptions-handler";
import validateError from "@/core/common/lib/validate-errors";

export async function countClientsAction(
  query?: string
): Promise<CommonResponse<number | null>> {
  try {
    const queryOptions: Prisma.ClientFindManyArgs<DefaultArgs> = {
      where: {
        isActive: true,
      },
    };

    if (query) {
      queryOptions.where = {
        isActive: true,
        OR: [
          {
            ccNumber: {
              contains: query,
            },
          },
          {
            fullName: {
              contains: query,
            },
          },
        ],
      };
    }

    const total = await prisma.client.count({
      where: { ...queryOptions.where },
    });

    if (!total) {
      return BadRequestException.exeption("No se encontro el cliente");
    }

    return {
      message: "Total found",
      statusCode: 200,
      data: total,
    };
  } catch (error) {
    return validateError(error);
  }
}
