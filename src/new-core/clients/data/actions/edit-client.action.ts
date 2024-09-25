"use server";

import { Client } from "@prisma/client";
import prisma from "@/lib/prisma";

import { CommonResponse } from "@Core/common/models/types";
import { validateCatchError } from "@Core/common/lib/validate-catch-error";
import { NotFoundException } from "@Core/common/errors/expetions";
import { EditClientDto } from "../dto/edit-client.dto";

export async function editClientAction(
  editClientDto: EditClientDto
): Promise<CommonResponse<Client>> {
  try {
    const clientEdited = await prisma.client.update({
      where: {
        id: editClientDto.id,
      },
      data: editClientDto,
    });

    if (!clientEdited) {
      throw new NotFoundException();
    }

    return {
      statusCode: 201,
      data: clientEdited,
    };
  } catch (error) {
    throw validateCatchError(error);
  }
}
