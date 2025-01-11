import { ClientReportEntity } from "../entities/client-report.entity";

export interface ClientReportRepository {
  findByCCNumber(ccNumber: string): Promise<ClientReportEntity | null>;
}
