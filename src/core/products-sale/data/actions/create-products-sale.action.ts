"use server";

import { PrismaTx } from "@Core/common/models/types";
import CreateProductSaleDto from "../dto/create-product-sale.dto";
import createSyncAction from "@/core/sync-remote/data/actions/create-sync.action";
import {
  SyncOperationEnum,
  SyncTableEnum,
} from "@/core/sync-remote/domain/interfaces/sync-remote";

interface CreateProductsSaleDto {
  tx: PrismaTx;
  products: Array<CreateProductSaleDto & { ticketId: number }>;
}
async function createProductsSaleAction(
  createProductsSaleDto: CreateProductsSaleDto
) {
  const { tx, products } = createProductsSaleDto;

  if (!tx) {
    throw new Error("No se puede crear un ticket sin transacción");
  }

  const createdProducts = await tx.productSale.createManyAndReturn({
    data: products,
  });

  const promises = createdProducts.map((p) => {
    return createSyncAction(
      {
        operation: SyncOperationEnum.CREATE,
        tableName: SyncTableEnum.ProductSale,
        recordId: p.id,
      },
      tx
    );
  });

  await Promise.allSettled(promises);

  return createdProducts;
}

export default createProductsSaleAction;
