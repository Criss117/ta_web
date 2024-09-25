"use server";
import { Prisma } from "@prisma/client";
import prisma from "@/lib/prisma";

import { FindClientDto } from "../dto/find-client.dto";
import { DefaultArgs } from "@prisma/client/runtime/library";
import {
  BadRequestException,
  NotFoundException,
} from "@Core/common/errors/expetions";
import { validateCatchError } from "@Core/common/lib/validate-catch-error";
import { CommonResponse } from "@Core/common/models/types";
import ClientEntity from "../../domain/entitites/client.entity";
import { TicketStateEnum } from "@Core/tickets/domain/enums/ticket-state.enum";

export async function findByIdOrCcNumber(
  findClientDto: FindClientDto
): Promise<CommonResponse<ClientEntity>> {
  if (!findClientDto.id && !findClientDto.ccNumber) {
    throw new BadRequestException();
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

  if (findClientDto.obtainTickets) {
    queryOptions.include = {
      tickets: {
        where: {
          state: "PENDING",
          isActive: true,
        },
        orderBy: {
          createdAt: "asc",
        },
      },
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
            state: "PENDING",
            isActive: true,
          },
          orderBy: {
            createdAt: "asc",
          },
        },
      },
    });

    if (!client) {
      throw new NotFoundException();
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
    throw validateCatchError(error);
  }
}
