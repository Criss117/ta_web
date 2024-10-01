import { Client } from "@prisma/client";
import ClientEntity from "../../domain/entitites/client.entity";
import { EditClientDto } from "../dto/edit-client.dto";

class ClientMapper {
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
