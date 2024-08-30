"use server";

import prisma from "@/lib/prisma";
import { validateCatchError } from "@/lib/utils";
import type { MutateClientReturnType } from "../../../models/type";

export async function deleteClientAction(
  ccNumber: string,
  id: number
): Promise<MutateClientReturnType> {
  try {
    const res = await prisma.client.update({
      where: {
        ccNumber,
        id,
      },
      data: {
        deletedAt: new Date(),
        isActive: false,
      },
    });

    return {
      data: res,
    };
  } catch (error) {
    return validateCatchError(error);
  }
}
