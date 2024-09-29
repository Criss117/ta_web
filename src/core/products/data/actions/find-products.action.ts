"use server";

import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";

import { CommonResponse, FindEntities } from "@Core/common/models/types";
import { validateCatchError } from "@Core/common/lib/validate-catch-error";

import ProductEntity from "../../domain/entities/product.entity";

async function findProductsAction({
  offset = 10,
  page = 0,
  filters,
}: FindEntities): Promise<CommonResponse<ProductEntity[]>> {
  console.log({ offset, page, filters });

  try {
    const queryOptions: Prisma.ProductFindManyArgs<DefaultArgs> = {
      skip: page * offset,
      take: offset,
      where: {
        isActive: true,
      },
    };

    if (filters?.minStock) {
      queryOptions.orderBy = {
        stock: "asc",
      };
    }

    if (filters?.query && filters.query?.length >= 3) {
      queryOptions.where = {
        isActive: true,
        OR: [
          {
            barcode: {
              contains: filters.query,
            },
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
      statusCode: 200,
      data: products.map((p) => {
        return {
          ...p,
          productSale: null,
        };
      }),
    };
  } catch (error) {
    throw validateCatchError(error);
  }
}

export default findProductsAction;
