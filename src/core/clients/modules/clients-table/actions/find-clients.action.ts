"use server";

import { Prisma } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";

import prisma from "@/lib/prisma";
import type { FindEntitiesParams } from "@/core/common/models/interfaces";
import { validateCatchError } from "@/lib/utils";

export async function findClientsAction({
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
      data: clients,
    };
  } catch (error) {
    return validateCatchError(error);
  }
}

export async function countClientsAction({
  query,
  offset = 10,
}: {
  query?: string;
  offset?: number;
}) {
  try {
    const queryOptions: Prisma.ClientFindManyArgs<DefaultArgs> = {
      where: {
        isActive: true,
      },
    };

    if (query) {
      queryOptions.where = {
        AND: [
          {
            isActive: true,
            OR: [
              {
                ccNumber: {
                  contains: query,
                },
              },
              {
                fullName: {
                  contains: query,
                },
              },
            ],
          },
        ],
      };
    }

    const total = await prisma.client.count({
      where: { ...queryOptions.where },
    });

    if (!total) return { data: { totalItems: 0, totalPage: 0 } };

    return {
      data: { totalItems: total, totalPage: Math.ceil(total / offset) },
    };
  } catch (error) {
    return validateCatchError(error);
  }
}
