"use server";

import prisma from "@/lib/prisma";
import { CommonResponse } from "@Core/common/models/types";
import ProductEntity from "../../domain/entities/product.entity";
import validateError from "@/core/common/lib/validate-errors";
import HttpStatusCodes from "@/core/common/lib/http-status-code";
import { NotFoundException } from "@/core/common/lib/errors/exeptions-handler";

async function findProductAction(
  barcode: string
): Promise<CommonResponse<ProductEntity | null>> {
  try {
    const product = await prisma.product.findFirst({
      where: {
        barcode,
      },
    });

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
