"use server";

import prisma from "@/lib/prisma";
import { CommonResponse } from "@Core/common/models/types";
import { validateCatchError } from "@Core/common/lib/validate-catch-error";
import ProductEntity from "../../domain/entities/product.entity";

async function findProductAction(
  barcode: string
): Promise<CommonResponse<ProductEntity>> {
  try {
    const product = await prisma.product.findFirst({
      where: {
        barcode,
      },
    });

    if (!product) {
      return {
        statusCode: 404,
        message: "Product not found",
      };
    }

    return {
      statusCode: 200,
      data: {
        ...product,
        productSale: [],
      },
    };
  } catch (error) {
    throw validateCatchError(error);
  }
}

export default findProductAction;
