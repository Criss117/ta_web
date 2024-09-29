import TicketToSaleServiceImpl from "../domain/service/ticket-to-sale.service.impl";

class TicketServiceFactory {
  static createTicketToSaleService() {
    return TicketToSaleServiceImpl.getInstance();
  }
}

export default TicketServiceFactory;
