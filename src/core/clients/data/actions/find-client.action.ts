"use server";
import { Prisma } from "@prisma/client";
import prisma from "@/lib/prisma";

import { FindClientDto } from "../dto/find-client.dto";
import { DefaultArgs } from "@prisma/client/runtime/library";
import { CommonResponse } from "@Core/common/models/types";
import ClientEntity from "../../domain/entitites/client.entity";
import { TicketStateEnum } from "@Core/tickets/domain/enums/ticket-state.enum";
import validateError from "@/core/common/lib/validate-errors";
import {
  BadRequestException,
  NotFoundException,
} from "@/core/common/lib/errors/exeptions-handler";

export async function findByIdOrCcNumber(
  findClientDto: FindClientDto
): Promise<CommonResponse<ClientEntity | null>> {
  if (!findClientDto.id && !findClientDto.ccNumber) {
    return BadRequestException.exeption("No id or ccNumber provided");
  }

  const queryOptions: Prisma.ClientFindFirstArgs<DefaultArgs> = {
    where: {
      isActive: true,
    },
  };

  if (findClientDto.id) {
    queryOptions.where = {
      ...queryOptions.where,
      id: findClientDto.id,
    };
  }
  if (findClientDto.ccNumber) {
    queryOptions.where = {
      ...queryOptions.where,
      ccNumber: findClientDto.ccNumber,
    };
  }

  try {
    const client = await prisma.client.findFirst({
      where: {
        isActive: true,
        ccNumber: findClientDto.ccNumber,
        id: findClientDto.id,
      },
      include: {
        tickets: {
          where: {
            state: findClientDto.obtainTickets ? "PENDING" : "NOT",
            isActive: true,
          },
          orderBy: {
            createdAt: "asc",
          },
        },
      },
    });

    if (!client) {
      return NotFoundException.exeption("El cliente no existe");
    }

    return {
      statusCode: 200,
      data: {
        ...client,
        tickets: client.tickets.map((ticket) => {
          return {
            ...ticket,
            clientId: client.id,
            state:
              TicketStateEnum[ticket.state as keyof typeof TicketStateEnum],
            productSales: null,
            client: null,
          };
        }),
      },
    };
  } catch (error) {
    return validateError(error);
  }
}
