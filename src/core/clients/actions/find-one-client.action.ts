"use server";

import { sleep, validateCatchError } from "@/lib/utils";
import prisma from "@/lib/prisma";
import {
  FindOneClientInputType,
  FindOneClientReturnType,
} from "../models/types";
import { Prisma } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";

export async function findOneClientAction(
  finOneClient: FindOneClientInputType
): Promise<FindOneClientReturnType> {
  const { ccNumber, obtaintTickets } = finOneClient;

  // await sleep(2000);
  const queryOptions: Prisma.ClientFindFirstArgs<DefaultArgs> = {
    where: {
      ccNumber,
      isActive: true,
    },
  };

  if (obtaintTickets) {
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
    const client = await prisma.client.findFirst(queryOptions);

    return {
      success: true,
      data: client,
    };
  } catch (error) {
    return validateCatchError(error);
  }
}
