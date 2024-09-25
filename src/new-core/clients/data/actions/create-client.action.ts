"use server";

import prisma from "@/lib/prisma";

import { CommonResponse } from "@Core/common/models/types";
import ClientEntity from "../../domain/entitites/client.entity";
import { validateCatchError } from "@Core/common/lib/validate-catch-error";
import { CreateClientDto } from "../dto/create-client.dto";

export async function createClientAction(
  clientEntity: CreateClientDto
): Promise<CommonResponse<ClientEntity>> {
  try {
    const client = await prisma.client.create({
      data: {
        ccNumber: clientEntity.ccNumber,
        fullName: clientEntity.fullName,
        address: clientEntity.address,
        phone: clientEntity.phone,
        creditLimit: clientEntity.creditLimit,
      },
    });

    return {
      statusCode: 201,
      message: "Client created successfully",
      data: {
        ...client,
        tickets: null,
      },
    };
  } catch (error) {
    throw validateCatchError(error);
  }
}
