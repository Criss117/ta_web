import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

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
    throw new Error("Invalid amount");
  }

  return new Intl.NumberFormat(locale, { style: "currency", currency }).format(
    amount
  );
}
