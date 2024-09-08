"use server";

import prisma from "@/lib/prisma";
import type {
  TicketInputType,
  TicketToPayInputType,
  ProductSaleInputType,
  DecrementStockInputType,
  PayReturnType,
  UpdateClientPayInputType,
  VerifyStockInputType,
} from "../models/types";
import { sleep, validateCatchError } from "@/lib/utils";
import { ProductsSaleToCreateAdapter } from "../adapters/products-sale-to-create.adapter";
import { PAY_MESSAGES } from "@/lib/messages/pay.message";

export async function createTicketAction(newTicket: TicketInputType) {
  const { tx, ...data } = newTicket!;

  if (tx) {
    return await tx.ticket.create({
      data,
    });
  }
}

export async function decrementProductStockAction(
  decrementStock: DecrementStockInputType
) {
  const { tx, productId, quantity } = decrementStock!;

  if (tx) {
    return await tx.product.update({
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
}

export async function updateClientAction(clientPay: UpdateClientPayInputType) {
  const { tx, ...data } = clientPay;

  if (tx) {
    const credit = await tx.client.findUnique({
      where: {
        id: data.id,
        ccNumber: data.ccNumber,
      },
      select: {
        creditLimit: true,
        balance: true,
      },
    });

    if (!credit) {
      throw new Error();
    }

    const newBalance = credit.balance + data.total;

    if (newBalance > credit.creditLimit) {
      throw new Error(PAY_MESSAGES.ERROR_TITLE, {
        cause: PAY_MESSAGES.CREDIT_LIMIT,
      });
    }

    return await tx.client.update({
      where: {
        id: data.id,
        ccNumber: data.ccNumber,
      },
      data: {
        balance: newBalance,
      },
    });
  }
}

export async function createProductsSaleAction(
  newProduct?: ProductSaleInputType
) {
  const { tx, products } = newProduct!;

  if (tx) {
    return await tx.productSale.createManyAndReturn({
      data: products,
    });
  }
}

export async function verifyStock(verifyStock: VerifyStockInputType) {
  const { tx, productId, quantity } = verifyStock;

  if (tx) {
    const product = await tx.product.findUnique({
      where: {
        id: productId,
      },
      select: {
        stock: true,
      },
    });

    if (!product) {
      throw new Error("El producto no existe", {
        cause: PAY_MESSAGES.PRODUCT_NOT_EXIST,
      });
    }

    if (product.stock < quantity) {
      throw new Error(PAY_MESSAGES.ERROR_TITLE, {
        cause: PAY_MESSAGES.STOCK_NOT_ENOUGH,
      });
    }
  }
}

export async function paymentAction(
  ticketToPay: TicketToPayInputType
): Promise<PayReturnType> {
  const { products, client, ...ticket } = ticketToPay;

  if (!products || products.length === 0) {
    return {
      success: false,
      error: "No hay productos para cobrar",
    };
  }

  try {
    await prisma.$transaction(async (tx) => {
      if (client) {
        await updateClientAction({
          tx,
          id: client.id,
          ccNumber: client.ccNumber,
          total: ticket.total,
        });
      }

      const newTicket = await createTicketAction({
        tx,
        state: client ? "PENDING" : "PAID",
        total: ticket.total,
        clientId: client?.id,
      });

      if (!newTicket || !newTicket.id) {
        throw new Error(PAY_MESSAGES.ERROR_TO_CREATE, {
          cause: PAY_MESSAGES.ERROR_TO_CREATE,
        });
      }

      const { id } = newTicket;

      const newProducts = await createProductsSaleAction({
        tx,
        products: ProductsSaleToCreateAdapter.adapt(id, products),
      });

      if (!newProducts) {
        throw new Error(PAY_MESSAGES.ERROR_TO_CREATE, {
          cause: PAY_MESSAGES.ERROR_TO_CREATE,
        });
      }

      products.map(async (product) => {
        await verifyStock({
          tx,
          productId: product.productId,
          quantity: product.quantity,
        });
        return decrementProductStockAction({
          tx,
          productId: product.productId,
          quantity: product.quantity,
        });
      });
    });

    return {
      success: true,
    };
  } catch (error: any) {
    return validateCatchError(error);
  }
}
