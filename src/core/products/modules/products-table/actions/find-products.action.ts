"use server";

import { Prisma } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";
import prisma from "@/lib/prisma";
import type { FindEntitiesParams } from "@/core/common/models/interfaces";
import { validateCatchError } from "@/lib/utils";

export async function findProductsAction({
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
    return validateCatchError(error);
  }
}

export async function countProductsAction({
  query,
  offset = 10,
}: {
  query?: string;
  offset?: number;
}) {
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

    const total = await prisma.product.count({
      where: { ...queryOptions.where },
    });

    if (!total) return { data: { totalItems: 0, totalPage: 0 } };

    return {
      data: { totalItems: total, totalPage: Math.ceil(total / offset) },
    };
  } catch (error) {
    return validateCatchError(error);
  }
}
