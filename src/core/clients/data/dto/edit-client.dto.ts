import { CreateClientDto } from "./create-client.dto";

export interface EditClientDto extends CreateClientDto {
  id: string;
}
