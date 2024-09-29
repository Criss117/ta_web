"use server";

import prisma from "@/lib/prisma";
import { CommonResponse } from "@Core/common/models/types";
import { validateCatchError } from "@Core/common/lib/validate-catch-error";

import type CreateProductDto from "../dto/create-product.dto";
import ProductEntity from "../../domain/entities/product.entity";

async function createProductAction(
  product: CreateProductDto
): Promise<CommonResponse<ProductEntity>> {
  try {
    const createdProduct = await prisma.product.create({
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
      message: "Client created successfully",
      data: {
        ...createdProduct,
        productSale: [],
      },
    };
  } catch (error) {
    throw validateCatchError(error);
  }
}

export default createProductAction;
