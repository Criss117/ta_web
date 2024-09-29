import { Client } from "@prisma/client";
import ClientSummaryDto from "../dto/client-summary.dto";
import ClientEntity from "../../domain/entitites/client.entity";
import { EditClientDto } from "../dto/edit-client.dto";

class ClientMapper {
  static summaryToDomain(clientsEntity: Client[]): ClientSummaryDto[] {
    const clients = clientsEntity.map((c) =>
      ClientSummaryDto.builder()
        .id(c.id)
        .fullName(c.fullName)
        .address(c.address)
        .balance(c.balance)
        .creditLimit(c.creditLimit)
        .ccNumber(c.ccNumber)
        .phone(c.phone)
        .build()
    );

    return clients;
  }

  static domainToEditClientDto(client: ClientEntity): EditClientDto {
    return {
      id: client.id,
      ccNumber: client.ccNumber,
      fullName: client.fullName,
      address: client.address,
      phone: client.phone,
      creditLimit: client.creditLimit,
    };
  }
}

export default ClientMapper;
