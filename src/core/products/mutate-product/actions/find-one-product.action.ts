"use server";

import { Prisma, Product } from "@prisma/client";

import prisma from "@/lib/prisma";
import { PRISMACODES } from "@/lib/constants/prisma-codes";
import { PRODUCT_FORM_MESSAGES } from "@/lib/messages/product.messages";
import { MutateProductReturnType } from "../models/types";

export async function findOneProduct(
  barcode: string
): Promise<MutateProductReturnType> {
  try {
    // throw new Error("test");
    const product = await prisma.product.findFirst({
      where: {
        barcode,
      },
    });

    if (!product) {
      return {
        error: PRODUCT_FORM_MESSAGES.ERROR,
      };
    }

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
