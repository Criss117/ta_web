"use server";

import prisma from "@/lib/prisma";
import {
  ProductSearchInputType,
  ProductSearchReturnType,
} from "../models/type";
import { createSafeAction } from "@/lib/create-safe-action";
import { ProductSearchSchema } from "../models/schema";

export async function getProductHandler(
  query: ProductSearchInputType
): Promise<ProductSearchReturnType> {
  const { barcode, description } = query;

  try {
    const product = await prisma.product.findFirst({
      where: {
        OR: [
          {
            barcode,
          },
          {
            description,
          },
        ],
      },
    });

    return {
      data: product,
    };
  } catch (error: Error | any) {
    return {
      error: error.message,
    };
  }
}

export const getProduct = createSafeAction(
  ProductSearchSchema,
  getProductHandler
);
