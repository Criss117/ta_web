"use server";

import prisma from "@/lib/prisma";
import { validateCatchError } from "@/lib/utils";
import { Prisma } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";

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
