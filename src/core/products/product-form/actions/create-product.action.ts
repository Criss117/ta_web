"use server";

import prisma from "@/lib/prisma";
import {
  CreateProductInputType,
  CreateProductReturnType,
} from "../models/types";

export async function createProduct(
  product: CreateProductInputType
): Promise<CreateProductReturnType> {
  try {
    throw new Error("test");
    const res = await prisma.product.create({
      data: product,
    });

    return {
      data: res,
    };
  } catch (error: Error | any) {
    return {
      error: error.message,
    };
  }
}
