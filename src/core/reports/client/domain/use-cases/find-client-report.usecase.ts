import { ClientReportRepository } from "../repositories/client-report.repository";

export class FindClientReportUseCase {
  static instance: FindClientReportUseCase;

  private constructor(private clientReportRepository: ClientReportRepository) {}

  static getInstance(clientReportRepository: ClientReportRepository) {
    if (!this.instance) {
      this.instance = new FindClientReportUseCase(clientReportRepository);
    }
    return this.instance;
  }

  execute(ccNumber: string) {
    console.log("caching: find-client-report", { ccNumber });
    return this.clientReportRepository.findByCCNumber(ccNumber);
  }
}
