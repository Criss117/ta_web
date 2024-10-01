import SyncRemoteEntity from "@/core/sync-remote/domain/entities/sync-remote.entity";
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
    return "";
  }

  return new Intl.NumberFormat(locale, { style: "currency", currency }).format(
    amount
  );
}

export function syncsRemoteReduced(syncsClient: SyncRemoteEntity[]) {
  return Array.from(
    syncsClient
      .reduce((map, record) => {
        map.set(record.recordId, record); // Sobrescribe el registro con el mismo recordId
        return map;
      }, new Map<number, SyncRemoteEntity>())
      .values()
  );
}
