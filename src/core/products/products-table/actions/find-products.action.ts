"use server";

import { Prisma } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";
import prisma from "@/lib/prisma";
import { sleep } from "@/lib/utils";
import type { Filters } from "../models/types";
import { PRISMACODES } from "@/lib/constants/prisma-codes";
import { PRODUCT_FORM_MESSAGES } from "@/lib/messages/product.messages";

interface FindProductsInputType {
  page: number;
  offSet: number;
  filters?: Filters;
}

export async function findProducts({
  offSet = 10,
  page = 0,
  filters = { minStock: false },
}: FindProductsInputType) {
  // await sleep(2000);

  try {
    const queryOptions: Prisma.ProductFindManyArgs<DefaultArgs> = {
      skip: page * offSet,
      take: offSet,
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

    console.log(products);

    return products;
  } catch (error) {
    console.log(error);

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

    return await prisma.product.count({
      where: { ...queryOptions.where },
    });
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
