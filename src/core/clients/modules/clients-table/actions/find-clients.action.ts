"use server";

import { Prisma } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";

import prisma from "@/lib/prisma";
import { PRISMACODES } from "@/lib/constants/prisma-codes";
import { FORM_MESSAGES } from "@/lib/messages/product.messages";
import type { FindEntitiesParams } from "@/core/models/interfaces";

export async function findClients({
  offset = 10,
  page = 0,
  filters,
}: FindEntitiesParams) {
  try {
    const queryOptions: Prisma.ClientFindManyArgs<DefaultArgs> = {
      skip: page * offset,
      take: offset,
      where: {
        isActive: true,
      },
    };

    const clients = await prisma.client.findMany({
      ...queryOptions,
    });

    return {
      data: clients,
    };
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      const prismaError = PRISMACODES.ERRORS.find(
        (err) => err.code === error.code
      );

      if (prismaError) {
        return {
          error: prismaError.message,
        };
      }
    }

    return {
      error: FORM_MESSAGES.UNKNOWN_ERROR,
    };
  }
}
