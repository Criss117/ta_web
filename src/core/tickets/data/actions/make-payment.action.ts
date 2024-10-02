"use server";

import prisma from "@/lib/prisma";
import { Ticket } from "@prisma/client";

import type { CommonResponse } from "@Core/common/models/types";
import updateClientBalanceAction from "@Core/clients/data/actions/update-balance.action";
import createProductsSaleAction from "@Core/products-sale/data/actions/create-products-sale.action";

import MakePaymentDto from "../dto/make-payment.dto";
import createTicketAction from "./create-ticket.action";
import verifyStockAndDecrement from "@Core/products/data/actions/verify-stock-and-decrement.action";
import type TicketCreatedDto from "../dto/ticket-created.dto";
import validateError from "@/core/common/lib/validate-errors";
import {
  BadRequestException,
  NotFoundException,
} from "@/core/common/lib/errors/exeptions-handler";
import HttpStatusCodes from "@/core/common/lib/http-status-code";

async function makePaymentAction(
  makePaymentDto: MakePaymentDto
): Promise<CommonResponse<TicketCreatedDto | null>> {
  const { clientId, ccNumber, total, productsSale } = makePaymentDto;

  if (!productsSale || productsSale.length === 0) {
    return BadRequestException.exeption("No hay productos en la venta");
  }

  try {
    const ticket = await prisma.$transaction(async (tx) => {
      if (ccNumber && clientId) {
        const newUser = await updateClientBalanceAction({
          tx,
          total,
          clientId,
          ccNumber,
        });

        if (!newUser) {
          throw new Error("No se pudo actualizar el balance del cliente", {
            cause: "No se pudo actualizar el balance del cliente",
          });
        }
      }

      const newTicket = await createTicketAction({
        tx,
        state: clientId && ccNumber ? "PENDING" : "PAID",
        total,
        clientId,
      });

      if (!newTicket) {
        throw new Error("No se pudo crear el ticket", {
          cause: "No se pudo crear el ticket",
        });
      }

      const newProductsSale = await createProductsSaleAction({
        tx,
        products: productsSale.map((p) => ({
          ...p,
          ticketId: newTicket.id,
        })),
      });

      if (!newProductsSale) {
        throw new Error("No se pudo crear la venta de los productos", {
          cause: "No se pudo crear la venta de los productos",
        });
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
      return NotFoundException.exeption("No se pudo crear el ticket");
    }

    return {
      statusCode: HttpStatusCodes.OK.code,
      data: ticket,
    };
  } catch (error) {
    return validateError(error);
  }
}

export default makePaymentAction;
