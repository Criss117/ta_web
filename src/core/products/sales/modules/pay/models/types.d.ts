import { z } from "zod";
import {
  ProductSaleSchema,
  TicketSchema,
  TicketStateSchema,
  TicketToPaySchema,
  CreateProductSaleSchema,
  DecremetentStockSchema,
} from "./schema";
import { Prisma, PrismaClient } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";

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

export type TicketToPayInputType = z.infer<typeof TicketToPaySchema>;
export type CreateProductSale = z.infer<typeof CreateProductSaleSchema>;
