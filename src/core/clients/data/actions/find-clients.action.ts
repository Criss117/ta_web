"use server";

import { Client, Prisma } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";

import prisma from "@/lib/prisma";
import { validateCatchError } from "@/lib/utils";
import type { CommonResponse, FindEntities } from "@Core/common/models/types";

export async function findClientsAction({
  offset = 10,
  page = 0,
  filters,
}: FindEntities): Promise<CommonResponse<Client[]>> {
  try {
    const queryOptions: Prisma.ClientFindManyArgs<DefaultArgs> = {
      skip: page * offset,
      take: offset,
      where: {
        isActive: true,
      },
    };

    if (filters?.query && filters.query?.length >= 3) {
      queryOptions.where = {
        isActive: true,
        OR: [
          {
            fullName: {
              contains: filters.query,
            },
          },
          {
            ccNumber: {
              contains: filters.query,
            },
          },
        ],
      };
    }

    const clients = await prisma.client.findMany({
      ...queryOptions,
    });

    return {
      statusCode: 200,
      data: clients,
    };
  } catch (error) {
    throw validateCatchError(error);
  }
}
