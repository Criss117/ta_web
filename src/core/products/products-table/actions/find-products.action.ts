"use server";

import { Prisma } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";
import prisma from "@/lib/prisma";
import { sleep } from "@/lib/utils";
import type { Filters } from "../models/types";

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

  const queryOptions: Prisma.ProductFindManyArgs<DefaultArgs> = {
    skip: page * offSet,
    take: offSet,
    select: {
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

  return products;
}

export async function countProducts(query?: string) {
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
    where: queryOptions.where,
  });
}
