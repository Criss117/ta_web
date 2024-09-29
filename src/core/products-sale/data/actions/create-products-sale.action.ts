"use server";

import { PrismaTx } from "@Core/common/models/types";
import CreateProductSaleDto from "../dto/create-product-sale.dto";

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

  return await tx.productSale.createManyAndReturn({
    data: products,
  });
}

export default createProductsSaleAction;
