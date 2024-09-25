"use server";

import { Prisma } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";

import prisma from "@/lib/prisma";

import { BadRequestException } from "@Core/common/errors/expetions";
import { validateCatchError } from "@Core/common/lib/validate-catch-error";
import { CommonResponse } from "@Core/common/models/types";

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
        AND: [
          {
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
          },
        ],
      };
    }

    const total = await prisma.client.count({
      where: { ...queryOptions.where },
    });

    if (!total) throw new BadRequestException("Total not found");

    return {
      message: "Total found",
      statusCode: 200,
      data: total,
    };
  } catch (error) {
    throw validateCatchError(error);
  }
}
