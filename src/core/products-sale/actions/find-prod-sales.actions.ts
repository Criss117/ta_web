"use server";

import { sleep, validateCatchError } from "@/lib/utils";
import type {
  FindProdcutsSalesInputType,
  FindProdcutsSalesReturnType,
} from "../models/type";
import prisma from "@/lib/prisma";

export async function findProdSalesByTicketIdAction(
  findPS: FindProdcutsSalesInputType
): Promise<FindProdcutsSalesReturnType> {
  // await sleep(2000);

  try {
    const products = await prisma.productSale.findMany({
      where: {
        ticketId: findPS.ticketId,
        ticket: {
          client: {
            ccNumber: findPS.ccNumber,
          },
        },
        isActive: true,
      },
      select: {
        id: true,
        salePrice: true,
        quantity: true,
        subTotal: true,
        product: {
          select: {
            description: true,
          },
        },
      },
    });

    return {
      success: true,
      data: products.map((product) => {
        return {
          id: product.id,
          salePrice: product.salePrice,
          quantity: product.quantity,
          subTotal: product.subTotal,
          description: product.product.description,
        };
      }),
    };
  } catch (error) {
    return validateCatchError(error);
  }
}
