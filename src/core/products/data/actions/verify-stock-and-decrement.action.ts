"use server";

import type VerifyStockDto from "../dto/verify-stock.dto";

async function verifyStockAndDecrement(verifyStock: VerifyStockDto) {
  const { tx, productId, quantity } = verifyStock;

  if (!tx) {
    throw new Error("No se puede verificar el stock sin transacción");
  }

  const product = await tx.product.findUnique({
    where: {
      id: productId,
    },
  });

  if (!product) {
    throw new Error("El producto no existe");
  }

  if (product.stock < quantity) {
    throw new Error("No hay suficiente stock");
  }

  await tx.product.update({
    where: {
      id: productId,
    },
    data: {
      stock: {
        decrement: quantity,
      },
    },
  });
}

export default verifyStockAndDecrement;
