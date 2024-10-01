import ClientEntity from "../../domain/entitites/client.entity";
import { ClientFormDto } from "../models/type";

class ClientDtoMapper {
  static toDomain(dto: ClientFormDto): ClientEntity {
    return ClientEntity.builder()
      .id(dto.id || "")
      .ccNumber(dto.ccNumber)
      .fullName(dto.fullName)
      .address(dto.address || null)
      .phone(dto.phone || null)
      .creditLimit(dto.creditLimit)
      .build();
  }

  static toDto(entity: ClientEntity): ClientFormDto {
    return {
      id: entity.id,
      ccNumber: entity.ccNumber,
      fullName: entity.fullName,
      address: entity.address || "",
      phone: entity.phone || "",
      creditLimit: entity.creditLimit,
    };
  }
}

export default ClientDtoMapper;
