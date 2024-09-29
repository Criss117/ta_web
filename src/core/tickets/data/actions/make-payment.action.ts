"use server";

import prisma from "@/lib/prisma";
import { Ticket } from "@prisma/client";

import type { CommonResponse } from "@Core/common/models/types";
import updateClientBalanceAction from "@Core/clients/data/actions/update-balance.action";
import createProductsSaleAction from "@Core/products-sale/data/actions/create-products-sale.action";
import { validateCatchError } from "@Core/common/lib/validate-catch-error";

import MakePaymentDto from "../dto/make-payment.dto";
import createTicketAction from "./create-ticket.action";
import verifyStockAndDecrement from "@Core/products/data/actions/verify-stock-and-decrement.action";
import type TicketCreatedDto from "../dto/ticket-created.dto";

async function makePaymentAction(
  makePaymentDto: MakePaymentDto
): Promise<CommonResponse<TicketCreatedDto>> {
  const { clientId, ccNumber, total, productsSale } = makePaymentDto;

  if (!productsSale || productsSale.length === 0) {
    throw new Error("No se puede crear un ticket sin productos");
  }

  try {
    const ticket = await prisma.$transaction(async (tx) => {
      if (ccNumber && clientId) {
        await updateClientBalanceAction({
          tx,
          total,
          clientId,
          ccNumber,
        });

        console.log("client updated");
      }

      const newTicket = await createTicketAction({
        tx,
        state: clientId && ccNumber ? "PENDING" : "PAID",
        total,
        clientId,
      });

      if (!newTicket) {
        throw new Error("No se pudo crear el ticket");
      }

      const newProductsSale = await createProductsSaleAction({
        tx,
        products: productsSale.map((p) => ({
          ...p,
          ticketId: newTicket.id,
        })),
      });

      if (!newProductsSale) {
        throw new Error("No se pudo crear la venta de los productos");
      }

      const promises = newProductsSale.map((p) => {
        return verifyStockAndDecrement({
          tx,
          productId: p.productId,
          quantity: p.quantity,
        });
      });

      await Promise.allSettled(promises).catch((error) => {
        throw new Error(error);
      });

      return {
        ...newTicket,
        productSale: newProductsSale,
      };
    });

    if (!ticket) {
      throw new Error("No se pudo crear el ticket");
    }

    return {
      statusCode: 201,
      data: ticket,
    };
  } catch (error) {
    throw validateCatchError(error);
  }
}

export default makePaymentAction;
