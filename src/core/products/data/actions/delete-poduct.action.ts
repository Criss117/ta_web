"use server";

import prisma from "@/lib/prisma";
import { CommonResponse } from "@Core/common/models/types";
import { BadRequestException } from "@Core/common/errors/expetions";
import { validateCatchError } from "@Core/common/lib/validate-catch-error";

import ProductEntity from "../../domain/entities/product.entity";

async function deleteProductAction(
  id: number
): Promise<CommonResponse<ProductEntity>> {
  try {
    const deletedProduct = await prisma.product.update({
      where: {
        id,
        isActive: true,
      },
      data: {
        barcode: "",
        isActive: false,
        deletedAt: new Date(),
      },
    });

    if (!deletedProduct) {
      throw new BadRequestException();
    }

    return {
      statusCode: 200,
      message: "Product deleted successfully",
      data: { ...deletedProduct, productSale: [] },
    };
  } catch (error) {
    throw validateCatchError(error);
  }
}

export default deleteProductAction;
