"use server";

import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";

import { CommonResponse, FindEntities } from "@Core/common/models/types";

import ProductEntity from "../../domain/entities/product.entity";
import HttpStatusCodes from "@/core/common/lib/http-status-code";
import validateError from "@/core/common/lib/validate-errors";

async function findProductsAction({
  offset = 10,
  page = 0,
  filters,
}: FindEntities): Promise<CommonResponse<ProductEntity[] | null>> {
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
      statusCode: HttpStatusCodes.OK.code,
      data: products.map((p) => {
        return {
          ...p,
          productSale: null,
        };
      }),
    };
  } catch (error) {
    return validateError(error);
  }
}

export default findProductsAction;
