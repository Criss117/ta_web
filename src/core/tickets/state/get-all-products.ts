"use server";

import prisma from "@/lib/prisma";
import { ProductTicket } from "../models/type";

export async function getAllProducts(): Promise<ProductTicket[]> {
  const res = await prisma.product.findMany();

  return res.map((product) => {
    return {
      id: product.id,
      barcode: product.barcode,
      description: product.description,
      salePrice: product.salePrice,
      quantity: product.stock,
      subTotal: product.stock * product.salePrice,
      stock: product.stock,
      originalPrice: product.salePrice,
      wholesalePrice: product.wholesalePrice,
      currentStock: product.stock,
    };
  });
}
