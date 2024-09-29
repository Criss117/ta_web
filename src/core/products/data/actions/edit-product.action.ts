"use server";

import prisma from "@/lib/prisma";

import { CommonResponse } from "@Core/common/models/types";

import EditProductDto from "../dto/edit-product.dto";
import ProductEntity from "../../domain/entities/product.entity";
import HttpStatusCodes from "@/core/common/lib/http-status-code";
import validateError from "@/core/common/lib/validate-errors";

async function editProductAction(
  product: EditProductDto
): Promise<CommonResponse<ProductEntity | null>> {
  try {
    const updatedProduct = await prisma.product.update({
      where: {
        id: product.id,
      },
      data: {
        barcode: product.barcode,
        description: product.description,
        costPrice: product.costPrice,
        salePrice: product.salePrice,
        wholesalePrice: product.wholesalePrice,
        stock: product.stock,
        minStock: product.minStock,
      },
    });

    return {
      statusCode: HttpStatusCodes.OK.code,
      data: {
        ...updatedProduct,
        productSale: [],
      },
    };
  } catch (error) {
    return validateError(error);
  }
}

export default editProductAction;
