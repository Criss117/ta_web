import { Prisma, PrismaClient } from "@prisma/client";
import { DefaultArgs, Omit } from "@prisma/client/runtime/library";

export interface CommonResponse<T = null> {
  statusCode: number;
  message?: string;
  data?: T;
  error?: string;
}

export type FindEntities = {
  filters?: Filters;
  offset: number;
  page: number;
};

export type Filters = {
  minStock?: boolean | undefined;
  query?: string | undefined;
};

export type PrismaTx = Omit<
  PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>,
  "$connect" | "$disconnect" | "$on" | "$transaction" | "$use" | "$extends"
>;
