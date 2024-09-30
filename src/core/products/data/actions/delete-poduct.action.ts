"use server";

import prisma from "@/lib/prisma";
import { CommonResponse } from "@Core/common/models/types";

import ProductEntity from "../../domain/entities/product.entity";
import validateError from "@/core/common/lib/validate-errors";
import HttpStatusCodes from "@/core/common/lib/http-status-code";
import createSyncAction from "@/core/sync-remote/data/actions/create-sync.action";
import {
  SyncOperationEnum,
  SyncTableEnum,
} from "@/core/sync-remote/domain/interfaces/sync-remote";

async function deleteProductAction(
  id: number
): Promise<CommonResponse<ProductEntity | null>> {
  try {
    const deletedProduct = await prisma.$transaction(async (tx) => {
      const deletedProduct = await tx.product.update({
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

      await createSyncAction(
        {
          operation: SyncOperationEnum.DELETE,
          recordId: deletedProduct.id,
          tableName: SyncTableEnum.Product,
        },
        tx
      );

      return deletedProduct;
    });

    return {
      statusCode: HttpStatusCodes.OK.code,
      data: { ...deletedProduct, productSale: [] },
    };
  } catch (error) {
    return validateError(error);
  }
}

export default deleteProductAction;
