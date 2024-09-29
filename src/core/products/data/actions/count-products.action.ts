"use server";

import { Prisma } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";

import prisma from "@/lib/prisma";

import { CommonResponse } from "@Core/common/models/types";
import validateError from "@/core/common/lib/validate-errors";
import { BadRequestException } from "@/core/common/lib/errors/exeptions-handler";
import HttpStatusCodes from "@/core/common/lib/http-status-code";

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

    if (!total) return BadRequestException.exeption("No clients found");

    return {
      statusCode: HttpStatusCodes.OK.code,
      data: total,
    };
  } catch (error) {
    return validateError(error);
  }
}
