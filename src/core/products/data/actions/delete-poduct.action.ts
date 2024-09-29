"use server";

import prisma from "@/lib/prisma";
import { CommonResponse } from "@Core/common/models/types";

import ProductEntity from "../../domain/entities/product.entity";
import validateError from "@/core/common/lib/validate-errors";
import { BadRequestException } from "@/core/common/lib/errors/exeptions-handler";
import HttpStatusCodes from "@/core/common/lib/http-status-code";

async function deleteProductAction(
  id: number
): Promise<CommonResponse<ProductEntity | null>> {
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
      return BadRequestException.exeption("No se pudo eliminar el producto");
    }

    return {
      statusCode: HttpStatusCodes.OK.code,
      data: { ...deletedProduct, productSale: [] },
    };
  } catch (error) {
    return validateError(error);
  }
}

export default deleteProductAction;
