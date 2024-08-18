"use server";

import prisma from "@/lib/prisma";

import { sleep } from "@/lib/utils";
import { Prisma } from "@prisma/client";
import { PRISMACODES } from "@/lib/constants/prisma-codes";
import { PRODUCT_FORM_MESSAGES } from "@/lib/messages/product.messages";
import type {
  EditProductInputType,
  MutateProductReturnType,
} from "@/core/products/modules/mutate-product/models/types";

export async function editProduct(
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
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      const prismaError = PRISMACODES.ERRORS.find(
        (err) => err.code === error.code
      );

      if (prismaError) {
        return {
          error: prismaError.message,
        };
      }
    }

    return {
      error: PRODUCT_FORM_MESSAGES.ERROR,
    };
  }
}
