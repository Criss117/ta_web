import { z } from "zod";
import {
  ProductSaleSchema,
  TicketSchema,
  TicketStateSchema,
  TicketToPaySchema,
  CreateProductSaleSchema,
  DecremetentStockSchema,
  UpdateClientPaySchema,
} from "./schema";
import { Prisma, PrismaClient } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";
import { ActionState } from "@/lib/create-safe-action";
import { ClientPay } from "@/core/clients/modules/client-list/models/types";

export type PrismaTx = Omit<
  PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>,
  "$connect" | "$disconnect" | "$on" | "$transaction" | "$use" | "$extends"
>;

export type Ticket = z.infer<typeof TicketSchema>;
export type TicketState = z.infer<typeof TicketStateSchema>;
export type ProductSale = z.infer<typeof ProductSaleSchema>;

export type ProductSaleInputType = {
  products: z.infer<CreateProductSaleSchema>[];
  tx?: PrismaTx;
};
export type TicketInputType = z.infer<typeof TicketSchema> & {
  tx?: PrismaTx;
};
export type DecrementStockInputType = z.infer<typeof DecremetentStockSchema> & {
  tx?: PrismaTx;
};

export type UpdateClientPayInputType = z.infer<typeof UpdateClientPaySchema> & {
  tx?: PrismaTx;
};

export type TicketToPayInputType = z.infer<typeof TicketToPaySchema> & {
  client?: ClientPay;
};

export type VerifyStockInputType = z.infer<typeof DecremetentStockSchema> & {
  tx?: PrismaTx;
};

export type CreateProductSale = z.infer<typeof CreateProductSaleSchema>;

export type PayReturnType = ActionState<TicketToPayInputType, null>;
