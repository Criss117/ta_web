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
  console.log("page", page, "offSet", offSet, "filters", filters);
  await sleep(2000);

  const queryOptions: Prisma.ProductFindManyArgs<DefaultArgs> = {
    skip: page * offSet,
    take: offSet,
  };

  if (filters.minStock) {
    queryOptions.orderBy = {
      stock: "asc",
    };
  }

  const products = await prisma.product.findMany({
    ...queryOptions,
  });

  return products;
}

export async function countProducts() {
  return await prisma.product.count();
}
