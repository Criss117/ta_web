import ClientEntity from "@/core/clients/domain/entitites/client.entity";
import DebtPaymentEntity from "@/core/clients/domain/entitites/debt-payment.entity";
import ProductSaleEntity from "@/core/products-sale/domain/entities/product-sale.entity";
import ProductEntity from "@/core/products/domain/entities/product.entity";
import TicketEntity from "@/core/tickets/domain/entities/ticket.entity";

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

export interface SyncToSend {
  toDelete: number[];
  toCreateOrUpdate: (
    | ClientEntity
    | ProductEntity
    | TicketEntity
    | ProductSaleEntity
    | DebtPaymentEntity
    | undefined
    | null
  )[];
}
