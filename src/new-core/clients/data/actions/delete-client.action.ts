"use server";

import prisma from "@/lib/prisma";
import { DeleteClientDto } from "../dto/delete-client.dto";
import { CommonResponse } from "@Core/common/models/types";
import ClientEntity from "../../domain/entitites/client.entity";
import { validateCatchError } from "@Core/common/lib/validate-catch-error";

export async function deleteClientAction({
  ccNumber,
  id,
}: DeleteClientDto): Promise<CommonResponse<ClientEntity | null>> {
  try {
    const res = await prisma.client.update({
      where: {
        ccNumber,
        id,
      },
      data: {
        deletedAt: new Date(),
        isActive: false,
      },
    });

    return {
      statusCode: 201,
      data: {
        ...res,
        tickets: null,
      },
    };
  } catch (error) {
    throw validateCatchError(error);
  }
}
