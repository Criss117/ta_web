"use server";

import prisma from "@/lib/prisma";

import { validateCatchError } from "@/lib/utils";
import {
  CreateClientInputType,
  MutateClientReturnType,
} from "../../../models/type";

export async function createClient(
  client: CreateClientInputType
): Promise<MutateClientReturnType> {
  try {
    const res = await prisma.client.create({
      data: client,
    });

    return {
      data: res,
    };
  } catch (error) {
    return validateCatchError(error);
  }
}
