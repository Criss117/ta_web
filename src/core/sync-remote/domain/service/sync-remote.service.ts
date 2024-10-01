import { ClientRepository } from "@/core/clients/domain/repositories/clients.repository";
import SyncRemoteEntity from "../entities/sync-remote.entity";
import {
  SyncOperationEnum,
  SyncToSend,
  TableName,
} from "../interfaces/sync-remote";
import { CommonResponse } from "@/core/common/models/types";
import { syncsRemoteReduced } from "@/lib/utils";
import ProductRepository from "../../../products/domain/repositories/product.repository";
import { TicketsRepository } from "../../../tickets/domain/repositories/tickets.repository";
import { ProductsSaleRepository } from "../../../products-sale/domain/repositories/products-sale.repository";
import DebtPaysRepository from "../../../clients/domain/repositories/debt-pays.repository";

const syncsObject: Record<TableName, SyncToSend> = {
  Product: {
    toDelete: [],
    toCreateOrUpdate: [],
  },
  Client: {
    toDelete: [],
    toCreateOrUpdate: [],
  },
  DebtPayment: {
    toDelete: [],
    toCreateOrUpdate: [],
  },
  Ticket: {
    toDelete: [],
    toCreateOrUpdate: [],
  },
  ProductSale: {
    toDelete: [],
    toCreateOrUpdate: [],
  },
};

class SyncRemoteService {
  private static instance: SyncRemoteService;

  private constructor(
    private readonly clientRepository: ClientRepository,
    private readonly productRepository: ProductRepository,
    private readonly ticketsRepository: TicketsRepository,
    private readonly productsSaleRepository: ProductsSaleRepository,
    private readonly debtPaysRepository: DebtPaysRepository
  ) {}

  static getInstance(
    clientRepository: ClientRepository,
    productRepository: ProductRepository,
    ticketsRepository: TicketsRepository,
    productsSaleRepository: ProductsSaleRepository,
    debtPaysRepository: DebtPaysRepository
  ) {
    if (!this.instance) {
      this.instance = new SyncRemoteService(
        clientRepository,
        productRepository,
        ticketsRepository,
        productsSaleRepository,
        debtPaysRepository
      );
    }
    return this.instance;
  }

  async synchronize(syncsRemote: SyncRemoteEntity[]) {
    const syncsRecord = this.separateSyncs(syncsRemote);

    const toSend = syncsObject;

    if (syncsRecord.Client.length > 0) {
      const syncsClient = await this.prepareClients(syncsRecord.Client);

      toSend.Client = syncsClient;
    }

    if (syncsRecord.Product.length > 0) {
      const syncsProduct = await this.prepareProducs(syncsRecord.Product);

      toSend.Product = syncsProduct;
    }

    if (syncsRecord.Ticket.length > 0) {
      const syncsTicket = await this.prepareTickets(syncsRecord.Ticket);

      toSend.Ticket = syncsTicket;
    }

    if (syncsRecord.ProductSale.length > 0) {
      const syncsProductSale = await this.prepareProductSales(
        syncsRecord.ProductSale
      );

      toSend.ProductSale = syncsProductSale;
    }

    if (syncsRecord.DebtPayment.length > 0) {
      const syncsDebtPays = await this.prepareDebtPays(syncsRecord.DebtPayment);

      toSend.DebtPayment = syncsDebtPays;
    }

    return toSend;
  }

  async prepareClients(syncsClient: SyncRemoteEntity[]) {
    return this.prepareSync(syncsClient, (id) =>
      this.clientRepository.findByIdOrCcNumber({
        id,
        obtainTickets: false,
      })
    );
  }

  async prepareProducs(syncsProduct: SyncRemoteEntity[]) {
    return this.prepareSync(syncsProduct, (id) =>
      this.productRepository.findById(id)
    );
  }

  async prepareTickets(syncsTicket: SyncRemoteEntity[]) {
    return this.prepareSync(syncsTicket, (id) =>
      this.ticketsRepository.findByid(id)
    );
  }

  async prepareProductSales(syncsProductSale: SyncRemoteEntity[]) {
    return this.prepareSync(syncsProductSale, (id) =>
      this.productsSaleRepository.findById(id)
    );
  }

  async prepareDebtPays(syncsDebtPays: SyncRemoteEntity[]) {
    return this.prepareSync(syncsDebtPays, (id) =>
      this.debtPaysRepository.findById(id)
    );
  }

  async prepareSync<T>(
    syncsRemote: SyncRemoteEntity[],
    callback: (id: number) => Promise<CommonResponse<T | null>>
  ) {
    const toDelete: number[] = [];

    const promises: Promise<CommonResponse<T | null>>[] = [];

    syncsRemoteReduced(syncsRemote).forEach((s) => {
      if (s.operation === SyncOperationEnum.DELETE) {
        toDelete.push(s.recordId);
        return;
      }

      promises.push(callback(s.recordId));
    });

    const toCreateOrUpdate = await Promise.all(promises)
      .then((res) => {
        return res.map((r) => ({
          data: r.data,
        }));
      })
      .then((res) => res.filter((r) => r.data !== null && r.data !== undefined))
      .then((res) => res.map((r) => r.data));

    return { toDelete, toCreateOrUpdate };
  }

  separateSyncs(syncsRemote: SyncRemoteEntity[]) {
    const syncsRemoteRecord: Record<TableName, SyncRemoteEntity[]> = {
      Product: [],
      Client: [],
      DebtPayment: [],
      Ticket: [],
      ProductSale: [],
    };

    syncsRemote.forEach((s) => {
      if (!s.tableName) return;

      syncsRemoteRecord[s.tableName].push(s);
    });

    return syncsRemoteRecord;
  }
}

export default SyncRemoteService;
