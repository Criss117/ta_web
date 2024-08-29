"use server";

import prisma from "@/lib/prisma";

import { sleep, validateCatchError } from "@/lib/utils";
import type {
  EditProductInputType,
  MutateProductReturnType,
} from "@/core/products/modules/mutate-product/models/types";

export async function editProductAction(
  product: EditProductInputType
): Promise<MutateProductReturnType> {
  // await sleep(2000);

  try {
    // throw new Error("test");
    const res = await prisma.product.update({
      where: {
        barcode: product.barcode,
        id: product.id,
      },
      data: product,
    });

    return {
      data: res,
    };
  } catch (error) {
    return validateCatchError(error);
  }
}
