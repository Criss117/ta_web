"use server";

import { validateCatchError } from "@/lib/utils";
import { MutateClientReturnType } from "../modules/mutate-client/models/type";
import prisma from "@/lib/prisma";

export async function findOneClientAction(
  ccNumber: string
): Promise<MutateClientReturnType> {
  try {
    const client = await prisma.client.findFirst({
      where: {
        AND: [
          {
            ccNumber,
            isActive: true,
          },
        ],
      },
    });

    return {
      data: client,
    };
  } catch (error) {
    return validateCatchError(error);
  }
}
