"use server";

import { Prisma } from "@prisma/client";

import prisma from "@/lib/prisma";
import { PRISMACODES } from "@/lib/constants/prisma-codes";
import { PRODUCT_FORM_MESSAGES } from "@/lib/messages/product.messages";
import { MutateProductReturnType } from "../modules/mutate-product/models/types";
import { sleep } from "@/lib/utils";

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
