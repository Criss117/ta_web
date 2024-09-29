"use server";

import prisma from "@/lib/prisma";

import { CommonResponse } from "@Core/common/models/types";
import { validateCatchError } from "@Core/common/lib/validate-catch-error";

import EditProductDto from "../dto/edit-product.dto";
import ProductEntity from "../../domain/entities/product.entity";

async function editProductAction(
  product: EditProductDto
): Promise<CommonResponse<ProductEntity>> {
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
      statusCode: 201,
      message: "Client updated successfully",
      data: {
        ...updatedProduct,
        productSale: [],
      },
    };
  } catch (error) {
    throw validateCatchError(error);
  }
}

export default editProductAction;
