"use server";

import { Prisma } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";

import prisma from "@/lib/prisma";

import { BadRequestException } from "@Core/common/errors/expetions";
import { validateCatchError } from "@Core/common/lib/validate-catch-error";
import { CommonResponse } from "@Core/common/models/types";

export async function countProductsAction(
  query?: string
): Promise<CommonResponse<number | null>> {
  try {
    const queryOptions: Prisma.ProductFindManyArgs<DefaultArgs> = {
      where: {
        isActive: true,
      },
    };

    if (query && query.length >= 3) {
      queryOptions.where = {
        isActive: true,
        OR: [
          {
            barcode: {
              contains: query,
            },
          },
          {
            description: {
              contains: query,
            },
          },
        ],
      };
    }

    const total = await prisma.product.count({
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
