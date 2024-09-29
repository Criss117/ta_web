"use server";

import { Client } from "@prisma/client";
import prisma from "@/lib/prisma";

import { CommonResponse } from "@Core/common/models/types";
import { EditClientDto } from "../dto/edit-client.dto";
import { NotFoundException } from "@/core/common/lib/errors/exeptions-handler";
import HttpStatusCodes from "@/core/common/lib/http-status-code";
import validateError from "@/core/common/lib/validate-errors";

export async function editClientAction(
  editClientDto: EditClientDto
): Promise<CommonResponse<Client | null>> {
  try {
    const clientEdited = await prisma.client.update({
      where: {
        id: 111,
      },
      data: editClientDto,
    });

    if (!clientEdited) {
      return NotFoundException.exeption("El cliente no existe");
    }

    return {
      statusCode: HttpStatusCodes.CREATED.code,
      data: clientEdited,
    };
  } catch (error) {
    return validateError(error);
  }
}
