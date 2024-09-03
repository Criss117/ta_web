"use server";
import prisma from "@/lib/prisma";

export async function findClientFullnameAction(ccNumber: string) {
  try {
    const client = await prisma.client.findFirst({
      where: {
        ccNumber,
        isActive: true,
      },
      select: {
        fullName: true,
      },
    });

    if (!client) {
      return null;
    }

    return client.fullName;
  } catch (error) {
    return null;
  }
}
