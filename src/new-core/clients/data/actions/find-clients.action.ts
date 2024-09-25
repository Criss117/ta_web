"use server";

import { Client, Prisma } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";

import prisma from "@/lib/prisma";
import { validateCatchError } from "@/lib/utils";
import type { FindEntitesInputType } from "@/core/common/models/types";
import type { CommonResponse } from "@Core/common/models/types";

export async function findClientsAction({
  offset = 10,
  page = 0,
  filters,
}: FindEntitesInputType): Promise<CommonResponse<Client[] | null>> {
  try {
    const queryOptions: Prisma.ClientFindManyArgs<DefaultArgs> = {
      skip: page * offset,
      take: offset,
      where: {
        isActive: true,
      },
    };

    if (filters && filters.query) {
      queryOptions.where = {
        AND: [
          {
            isActive: true,
            OR: [
              {
                fullName: {
                  contains: filters.query,
                },
              },
            ],
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
