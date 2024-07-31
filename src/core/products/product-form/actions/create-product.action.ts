"use server";

import prisma from "@/lib/prisma";
import {
  CreateProductInputType,
  MutateProductReturnType,
} from "../models/types";
import { sleep } from "@/lib/utils";
import { Prisma } from "@prisma/client";
import { PRISMACODES } from "@/lib/constants/prisma-codes";
import { PRODUCT_FORM_MESSAGES } from "@/lib/messages/product.messages";

export async function createProduct(
  product: CreateProductInputType
): Promise<MutateProductReturnType> {
  await sleep(2000);

  try {
    throw new Error("test");
    const res = await prisma.product.create({
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
