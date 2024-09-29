export interface CreateClientDto {
  fullName: string;
  phone: string | null;
  address: string | null;
  ccNumber: string;
  creditLimit: number;
}
