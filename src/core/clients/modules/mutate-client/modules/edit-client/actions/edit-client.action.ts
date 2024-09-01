"use server";

import prisma from "@/lib/prisma";
import {
  EditClientInputType,
  MutateClientReturnType,
} from "../../../models/type";
import { validateCatchError } from "@/lib/utils";

export async function editClientAction(
  client: EditClientInputType
): Promise<MutateClientReturnType> {
  try {
    const res = await prisma.client.update({
      where: {
        id: client.id,
      },
      data: client,
    });

    return {
      success: true,
      data: res,
    };
  } catch (error) {
    return validateCatchError(error);
  }
}
