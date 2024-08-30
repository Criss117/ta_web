"use server";

import prisma from "@/lib/prisma";

import type { MutateProductReturnType } from "../../../models/types";
import { sleep, validateCatchError } from "@/lib/utils";

export async function deleteProductAction(
  barcode: string,
  id: number
): Promise<MutateProductReturnType> {
  // await sleep(2000);

  try {
    const res = await prisma.product.update({
      where: {
        barcode,
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
