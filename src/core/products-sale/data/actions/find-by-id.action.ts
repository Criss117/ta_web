"use server";

import HttpStatusCodes from "@/core/common/lib/http-status-code";
import { CommonResponse } from "@/core/common/models/types";
import prisma from "@/lib/prisma";
import { ProductSale } from "@prisma/client";

async function findByIdAction(
  id: string
): Promise<CommonResponse<ProductSale | null>> {
  const productSale = await prisma.productSale.findUnique({
    where: {
      id,
      isActive: true,
    },
  });

  return {
    statusCode: HttpStatusCodes.OK.code,
    data: productSale,
  };
}
export default findByIdAction;
