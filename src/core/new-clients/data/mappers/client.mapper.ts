import { Client } from "@prisma/client";
import ClientSummaryEntity from "../../domain/entitites/client-summary.entity";
import { Pagination } from "../../domain/models/pagination";

interface pagData {
  offset: number;
  page: number;
  totalItems: number;
  totalPage: number;
}

class ClientMapper {
  static summaryToDomain(
    clientsEntity: Client[],
    pagData: pagData
  ): Pagination<ClientSummaryEntity> {
    const clients = clientsEntity.map((c) =>
      ClientSummaryEntity.builder()
        .id(c.id)
        .fullName(c.fullName)
        .address(c.address)
        .balance(c.balance)
        .creditLimit(c.creditLimit)
        .ccNumber(c.ccNumber)
        .phone(c.phone)
        .build()
    );

    return {
      total: pagData.totalItems,
      offset: pagData.offset,
      page: pagData.page,
      totalPage: pagData.totalPage,
      items: clients,
    };
  }
}

export default ClientMapper;
