"use server";

import { Prisma } from "@prisma/client";

import prisma from "@/lib/prisma";
import { PRISMACODES } from "@/lib/constants/prisma-codes";
import { PRODUCT_FORM_MESSAGES } from "@/lib/messages/product.messages";

import type { MutateProductReturnType } from "../../../models/types";
import { sleep } from "@/lib/utils";

export async function deleteProductAction(
  barcode: string,
  id: number
): Promise<MutateProductReturnType> {
  await sleep(2000);

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
      error: PRODUCT_FORM_MESSAGES.DELETED_ERROR,
    };
  }
}
