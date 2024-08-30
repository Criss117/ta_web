"use server";

import prisma from "@/lib/prisma";

import { sleep, validateCatchError } from "@/lib/utils";
import type {
  EditProductInputType,
  MutateProductReturnType,
} from "@/core/products/modules/mutate-product/models/types";
import { Prisma } from "@prisma/client";
import { PRISMACODES } from "@/lib/constants/prisma-codes";
import { FORM_MESSAGES } from "@/lib/messages/product.messages";

export async function editProductAction(
  product: EditProductInputType
): Promise<MutateProductReturnType> {
  // await sleep(2000);

  try {
    // throw new Error("test");
    const res = await prisma.product.update({
      where: {
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
          data: undefined,
        };
      }
    }

    return {
      error: FORM_MESSAGES.UNKNOWN_ERROR,
      data: undefined,
    };
  }
}
