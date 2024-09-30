"use server";

import prisma from "@/lib/prisma";
import { CommonResponse } from "@Core/common/models/types";

import type CreateProductDto from "../dto/create-product.dto";
import ProductEntity from "../../domain/entities/product.entity";
import validateError from "@/core/common/lib/validate-errors";
import HttpStatusCodes from "@/core/common/lib/http-status-code";
import createSyncAction from "@/core/sync-remote/data/actions/create-sync.action";
import {
  SyncOperationEnum,
  SyncTableEnum,
} from "@/core/sync-remote/domain/interfaces/sync-remote";

async function createProductAction(
  product: CreateProductDto
): Promise<CommonResponse<ProductEntity | null>> {
  try {
    const createdProduct = await prisma.$transaction(async (tx) => {
      const createdProduct = await tx.product.create({
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

      await createSyncAction(
        {
          operation: SyncOperationEnum.CREATE,
          tableName: SyncTableEnum.Product,
          recordId: createdProduct.id,
        },
        tx
      );

      return createdProduct;
    });

    return {
      statusCode: HttpStatusCodes.CREATED.code,
      data: {
        ...createdProduct,
        productSale: [],
      },
    };
  } catch (error) {
    return validateError(error);
  }
}

export default createProductAction;
