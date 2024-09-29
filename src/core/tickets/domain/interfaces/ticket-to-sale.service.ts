import TicketToSaleEntity from "../entities/ticket-to-sale.entity";
import ProductEntity from "@Core/products/domain/entities/product.entity";

export interface WithCTId<T> {
  currentTicketId: number;
  tickets: T;
}

export type ChangeSalePriceOrQuantity = {
  barcode: string;
  newSalePrice: number;
  newQuantity: number;
};

export type TicketTSList = Array<TicketToSaleEntity>;

interface TicketToSaleService {
  clearTickets(): TicketTSList;
  setNewTicket(tickets: TicketTSList): WithCTId<TicketTSList>;
  deleteTicket(
    tickets: TicketTSList,
    currentTicketId: number,
    ticketId: number
  ): WithCTId<TicketTSList>;
  clearTicket(
    tickets: TicketTSList,
    currentTicketId: number,
    ticketId?: number
  ): WithCTId<TicketTSList>;
  addProductToCurrentTicket(
    tickets: TicketTSList,
    currentTicketId: number,
    product: ProductEntity
  ): TicketTSList;
  getCurrentTicket(
    tickets: TicketTSList,
    currentTicketId: number
  ): TicketToSaleEntity | null;
  removeProductFromCurrentTicket(
    tickets: TicketTSList,
    currentTicketId: number,
    barcode: string
  ): TicketTSList;
  changeSalePriceOrQuantity(
    tickets: TicketTSList,
    currentTicketId: number,
    pInfo: ChangeSalePriceOrQuantity
  ): TicketTSList;
  changeToWholeSalePrice(
    tickets: TicketTSList,
    currentTicketId: number,
    barcode: string
  ): TicketTSList;
}

export default TicketToSaleService;
