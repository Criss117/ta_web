"use server";

import prisma from "@/lib/prisma";
import type {
  FindDPByClientIdInputType,
  FindDPByClientIdReturnType,
} from "../models/type";
import { validateCatchError } from "@/lib/utils";

export async function findDPByClientId({
  clientId,
}: FindDPByClientIdInputType): Promise<FindDPByClientIdReturnType> {
  try {
    const res = await prisma.debtPayment.findMany({
      where: {
        clientId,
        isActive: true,
      },
    });

    return {
      success: true,
      data: res,
    };
  } catch (error) {
    return validateCatchError(error);
  }
}
