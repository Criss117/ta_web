"use server";

import prisma from "@/lib/prisma";
import { MutateProductReturnType } from "../modules/mutate-product/models/types";
import { sleep, validateCatchError } from "@/lib/utils";

export async function findOneProductAction(
  barcode: string
): Promise<MutateProductReturnType> {
  // await sleep(2000);

  try {
    // throw new Error("test");
    const product = await prisma.product.findFirst({
      where: {
        barcode,
      },
    });

    return {
      data: product,
    };
  } catch (error) {
    return validateCatchError(error);
  }
}
