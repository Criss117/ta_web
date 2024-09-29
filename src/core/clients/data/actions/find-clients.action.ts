"use server";

import { Client, Prisma } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";

import prisma from "@/lib/prisma";
import type { CommonResponse, FindEntities } from "@Core/common/models/types";
import validateError from "@/core/common/lib/validate-errors";
import HttpStatusCodes from "@/core/common/lib/http-status-code";

export async function findClientsAction({
  offset = 10,
  page = 0,
  filters,
}: FindEntities): Promise<CommonResponse<Client[] | null>> {
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
      statusCode: HttpStatusCodes.OK.code,
      data: clients,
    };
  } catch (error) {
    return validateError(error);
  }
}
