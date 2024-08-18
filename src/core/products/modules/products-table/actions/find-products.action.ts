"use server";

import { Prisma } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";
import prisma from "@/lib/prisma";
import { PRISMACODES } from "@/lib/constants/prisma-codes";
import {
  FORM_MESSAGES,
  PRODUCT_FORM_MESSAGES,
} from "@/lib/messages/product.messages";
import type { FindEntitiesParams } from "@/core/models/interfaces";

export async function findProducts({
  offset = 10,
  page = 0,
  filters = { minStock: false },
}: FindEntitiesParams) {
  try {
    const queryOptions: Prisma.ProductFindManyArgs<DefaultArgs> = {
      skip: page * offset,
      take: offset,
      where: {
        isActive: true,
      },
      select: {
        id: true,
        barcode: true,
        description: true,
        costPrice: true,
        salePrice: true,
        stock: true,
        minStock: true,
        createdAt: true,
      },
    };

    if (filters.minStock) {
      queryOptions.orderBy = {
        stock: "asc",
      };
    }

    if (filters.query) {
      queryOptions.where = {
        ...queryOptions.where,
        OR: [
          {
            barcode: filters.query,
          },
          {
            description: {
              contains: filters.query,
            },
          },
        ],
      };
    }

    const products = await prisma.product.findMany({
      ...queryOptions,
    });

    return {
      data: products,
    };
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      const prismaError = PRISMACODES.ERRORS.find(
        (err) => err.code === error.code
      );

      if (prismaError) {
        return {
          error: prismaError.message,
        };
      }
    }

    return {
      error: FORM_MESSAGES.UNKNOWN_ERROR,
    };
  }
}

export async function countProducts(query?: string) {
  try {
    const queryOptions: Prisma.ProductFindManyArgs<DefaultArgs> = {};
    if (query) {
      queryOptions.where = {
        OR: [
          {
            barcode: query,
          },
          {
            description: {
              contains: query,
            },
          },
        ],
      };
    }

    const res = await prisma.product.count({
      where: { ...queryOptions.where },
    });

    return {
      data: res,
    };
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      const prismaError = PRISMACODES.ERRORS.find(
        (err) => err.code === error.code
      );

      if (prismaError) {
        return {
          error: prismaError.message,
        };
      }
    }

    return {
      error: PRODUCT_FORM_MESSAGES.UNKNOWN_ERROR,
    };
  }
}
