"use server";

import prisma from "@/lib/prisma";
import { CommonResponse } from "@Core/common/models/types";
import { FindByTicketDto } from "../dto/find-by-ticket.dto";
import { ProductSaleSummaryDto } from "../dto/product-sale-summary.dto";
import validateError from "@/core/common/lib/validate-errors";

export async function findByTicketAction(
  findByTicket: FindByTicketDto
): Promise<CommonResponse<Array<ProductSaleSummaryDto> | null>> {
  try {
    const productsSale = await prisma.productSale.findMany({
      where: {
        ticket: {
          id: findByTicket.ticketId,
          isActive: true,
          client: {
            id: findByTicket.clientId,
            isActive: true,
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
            id: true,
            description: true,
          },
        },
      },
    });

    return {
      statusCode: 201,
      data: productsSale,
    };
  } catch (error) {
    return validateError(error);
  }
}
