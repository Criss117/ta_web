import { FindClientReportUseCase } from "../domain/use-cases/find-client-report.usecase";
import { ClientReportRepositoryImpl } from "../infrastructure/repositories/client-report.repository.impl";

export class ClientReportUseCasesFactory {
  private static clientReportRepository =
    ClientReportRepositoryImpl.getInstance();

  static createFindClientReport() {
    return FindClientReportUseCase.getInstance(this.clientReportRepository);
  }
}
