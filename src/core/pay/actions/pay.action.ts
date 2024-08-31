"use server";

import prisma from "@/lib/prisma";
import type {
  TicketInputType,
  TicketToPayInputType,
  ProductSaleInputType,
  DecrementStockInputType,
} from "../models/types";
import { validateCatchError } from "@/lib/utils";
import { ProductsSaleToCreateAdapter } from "../adapters/products-sale-to-create.adapter";

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

export async function payAction(ticketToPay: TicketToPayInputType) {
  const { products, ...ticket } = ticketToPay;

  try {
    const res = await prisma.$transaction(async (tx) => {
      const newTicket = await createTicketAction({ tx, ...ticket });

      if (!newTicket || !newTicket.id) {
        throw new Error("No se pudo crear el ticket");
      }

      const { id } = newTicket;

      const newProducts = await createProductsSaleAction({
        tx,
        products: ProductsSaleToCreateAdapter.adapt(id, products),
      });

      if (!newProducts) {
        throw new Error("No se pudo crear el ticket");
      }

      const decrementsPromise = products.map((product) =>
        decrementProductStockAction({
          tx,
          productId: product.productId,
          quantity: product.quantity,
        })
      );

      const newStocks = await Promise.all(decrementsPromise);

      return [newTicket, newProducts, newStocks];
    });

    console.log({
      data: {
        ticket: res[0],
        products: res[1],
        stocks: res[2],
      },
    });

    return {
      data: {
        ticket: res[0],
        products: res[1],
      },
    };
  } catch (error) {
    return validateCatchError(error);
  }
}
