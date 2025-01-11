import prisma from "@/lib/prisma";
import { ClientReportEntity } from "../../domain/entities/client-report.entity";
import { ClientReportRepository } from "../../domain/repositories/client-report.repository";
import { ClientReportMapper } from "../mappers/client-report.mapper";

export class ClientReportRepositoryImpl implements ClientReportRepository {
  static instance: ClientReportRepositoryImpl;

  private constructor() {}

  public static getInstance(): ClientReportRepositoryImpl {
    if (!ClientReportRepositoryImpl.instance) {
      ClientReportRepositoryImpl.instance = new ClientReportRepositoryImpl();
    }
    return ClientReportRepositoryImpl.instance;
  }

  public async findByCCNumber(
    ccNumber: string
  ): Promise<ClientReportEntity | null> {
    const client = await prisma.client.findUnique({
      where: {
        ccNumber,
        isActive: true,
      },
    });

    if (!client) {
      return null;
    }

    const tickets = await prisma.ticket.findMany({
      where: {
        clientId: client?.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const debts = await prisma.debtPayment.findMany({
      where: {
        clientId: client?.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const clientReport = ClientReportMapper.consultToDomain(
      client,
      tickets,
      debts
    );

    return clientReport;
  }
}
