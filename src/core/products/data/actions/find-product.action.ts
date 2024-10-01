"use server";

import prisma from "@/lib/prisma";
import { CommonResponse } from "@Core/common/models/types";
import ProductEntity from "../../domain/entities/product.entity";
import validateError from "@/core/common/lib/validate-errors";
import HttpStatusCodes from "@/core/common/lib/http-status-code";
import {
  BadRequestException,
  NotFoundException,
} from "@/core/common/lib/errors/exeptions-handler";
import { Prisma } from "@prisma/client";

interface Args {
  barcode?: string;
  id?: string;
}

async function findProductAction({
  barcode,
  id,
}: Args): Promise<CommonResponse<ProductEntity | null>> {
  if (!barcode && !id) {
    return BadRequestException.exeption("No se encontro el producto");
  }

  const queryOptions: Prisma.ProductFindManyArgs = {
    where: {
      isActive: true,
    },
  };

  if (id) {
    queryOptions.where = {
      ...queryOptions.where,
      id,
    };
  }
  if (barcode) {
    queryOptions.where = {
      ...queryOptions.where,
      barcode,
    };
  }

  try {
    const product = await prisma.product.findFirst(queryOptions);

    if (!product) {
      return NotFoundException.exeption("No se encontro el producto");
    }

    return {
      statusCode: HttpStatusCodes.OK.code,
      data: {
        ...product,
        productSale: [],
      },
    };
  } catch (error) {
    return validateError(error);
  }
}

export default findProductAction;
