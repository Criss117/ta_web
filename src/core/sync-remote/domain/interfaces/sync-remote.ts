export type TableName =
  | "Product"
  | "Client"
  | "DebtPayment"
  | "Ticket"
  | "ProductSale";

export type SyncState = "PENDING" | "SUCCESS" | "FAILED";

export type SyncOperation = "CREATE" | "UPDATE" | "DELETE" | "SETTLE_DEBT";

export const SyncStateEnum = {
  PENDING: "PENDING",
  SUCCESS: "SUCCESS",
  FAILED: "FAILED",
} as const;

export const SyncOperationEnum = {
  CREATE: "CREATE",
  UPDATE: "UPDATE",
  DELETE: "DELETE",
  SETTLE_DEBT: "SETTLE_DEBT",
} as const;

export const SyncTableEnum = {
  Product: "Product",
  Client: "Client",
  DebtPayment: "DebtPayment",
  Ticket: "Ticket",
  ProductSale: "ProductSale",
} as const;
