import { Prisma } from "@prisma/client";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { PRISMACODES } from "./constants/prisma-codes";
import { FORM_MESSAGES } from "./messages/product.messages";
import { CommonResponse } from "@Core/common/models/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function sleep(ms = 500) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function formatCurrency(
  amount: number,
  locale: Intl.LocalesArgument = "es-CO",
  currency: Intl.NumberFormatOptions["currency"] = "COP"
): string {
  if (isNaN(amount)) {
    return "";
  }

  return new Intl.NumberFormat(locale, { style: "currency", currency }).format(
    amount
  );
}
