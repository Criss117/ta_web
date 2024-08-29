"use server";

import prisma from "@/lib/prisma";
import {
  EditClientInputType,
  MutateClientReturnType,
} from "../../../models/type";
import { validateCatchError } from "@/lib/utils";

export async function editClient(
  client: EditClientInputType
): Promise<MutateClientReturnType> {
  try {
    const res = await prisma.client.update({
      where: {
        ccNumber: client.ccNumber,
        id: client.id,
      },
      data: client,
    });

    return {
      data: res,
    };
  } catch (error) {
    return validateCatchError(error);
  }
}
