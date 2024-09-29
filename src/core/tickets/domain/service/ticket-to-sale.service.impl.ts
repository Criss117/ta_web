import TicketToSaleService, {
  ChangeSalePriceOrQuantity,
  TicketTSList,
  WithCTId,
} from "../interfaces/ticket-to-sale.service";
import TicketToSaleEntity from "../entities/ticket-to-sale.entity";
import ProductTicketEntity from "@Core/products/domain/entities/product-ticket.entity";
import ProductEntity from "@Core/products/domain/entities/product.entity";

class TicketToSaleServiceImpl implements TicketToSaleService {
  private static instance: TicketToSaleServiceImpl;

  private constructor() {}

  static getInstance(): TicketToSaleServiceImpl {
    if (!this.instance) {
      this.instance = new this();
    }

    return this.instance;
  }

  clearTickets(): TicketTSList {
    const tickets = [
      TicketToSaleEntity.builder()
        .id(1)
        .label("Ticket 1")
        .total(0)
        .productsTickets([])
        .build(),
    ];

    return tickets;
  }

  setNewTicket(tickets: TicketTSList): WithCTId<TicketTSList> {
    let newId = -1;

    tickets.forEach((ticket) => {
      if (ticket.id > newId) {
        newId = ticket.id;
      }
    });

    const newTicket = TicketToSaleEntity.builder()
      .id(newId + 1)
      .label(`Ticket ${newId + 1}`)
      .total(0)
      .productsTickets([])
      .build();

    return {
      currentTicketId: newTicket.id,
      tickets: [...tickets, newTicket],
    };
  }

  deleteTicket(
    tickets: TicketTSList,
    currentTicketId: number,
    ticketId: number
  ): WithCTId<TicketTSList> {
    if (ticketId <= 0) {
      return {
        currentTicketId,
        tickets: tickets,
      };
    }

    if (tickets.length <= 1) {
      return { tickets: this.clearTickets(), currentTicketId: 1 };
    }

    const newTickets = tickets.filter((ticket) => ticket.id !== ticketId);

    const newCurrentTicketId =
      currentTicketId === ticketId ? newTickets[0].id : currentTicketId;

    return {
      currentTicketId: newCurrentTicketId,
      tickets: newTickets,
    };
  }

  clearTicket(
    tickets: TicketTSList,
    currentTicketId: number,
    ticketId?: number
  ): WithCTId<TicketTSList> {
    if (!ticketId) {
      ticketId = currentTicketId;
    }

    if (ticketId && ticketId <= 0) {
      return {
        currentTicketId,
        tickets: tickets,
      };
    }

    const newTickets = tickets.map((ticket) => {
      if (ticket.id === ticketId) {
        return {
          ...ticket,
          total: 0,
          productsTickets: [],
        };
      }

      return ticket;
    });

    return {
      currentTicketId,
      tickets: newTickets,
    };
  }

  addProductToCurrentTicket(
    tickets: TicketTSList,
    currentTicketId: number,
    newProduct: ProductEntity
  ): TicketTSList {
    const currentTicket = tickets.find(
      (ticket) => ticket.id === currentTicketId
    );

    if (!currentTicket) return tickets;

    const existingProduct = currentTicket.productsTickets.find(
      (p) => p.barcode === newProduct.barcode
    );

    const newTicket = currentTicket;

    if (existingProduct) {
      existingProduct.quantity += 1;
      existingProduct.subTotal += newProduct.salePrice;
      existingProduct.currentStock -= 1;

      newTicket.productsTickets = currentTicket.productsTickets.map((p) => {
        if (p.barcode === newProduct.barcode) {
          return existingProduct;
        }
        return p;
      });
    } else {
      const newProductTicket = ProductTicketEntity.builder()
        .id(newProduct.id)
        .barcode(newProduct.barcode)
        .productId(newProduct.id)
        .description(newProduct.description)
        .salePrice(newProduct.salePrice)
        .wholesalePrice(newProduct.wholesalePrice)
        .stock(newProduct.stock)
        .originalSalePrice(newProduct.salePrice)
        .currentStock(--newProduct.stock)
        .subTotal(newProduct.salePrice)
        .quantity(1)
        .build();

      newTicket.productsTickets.push(newProductTicket);
    }

    const newTickets = tickets.map((ticket) => {
      if (ticket.id === currentTicket.id) {
        return {
          ...newTicket,
          total: newTicket.productsTickets
            .map((p) => p.subTotal)
            .reduce((a, b) => a + b, 0),
        };
      }
      return ticket;
    });

    return newTickets;
  }

  getCurrentTicket(
    tickets: TicketTSList,
    currentTicketId: number
  ): TicketToSaleEntity | null {
    return tickets.find((ticket) => ticket.id === currentTicketId) || null;
  }

  removeProductFromCurrentTicket(
    tickets: TicketTSList,
    currentTicketId: number,
    barcode: string
  ): TicketTSList {
    const currentTicket = this.getCurrentTicket(tickets, currentTicketId);
    if (!currentTicket) return tickets;

    const salePrice = currentTicket.productsTickets.find(
      (p) => p.barcode === barcode
    )?.salePrice;

    if (!salePrice) return tickets;

    const newTicket = {
      ...currentTicket,
      productsTickets: currentTicket.productsTickets.filter(
        (p) => p.barcode !== barcode
      ),
    };

    const newTickets = tickets.map((ticket) => {
      if (ticket.id === currentTicket.id) {
        return {
          ...newTicket,
          total: newTicket.productsTickets
            .map((p) => p.subTotal)
            .reduce((a, b) => a + b, 0),
        };
      }
      return ticket;
    });

    return newTickets;
  }

  changeSalePriceOrQuantity(
    tickets: TicketTSList,
    currentTicketId: number,
    pInfo: ChangeSalePriceOrQuantity
  ): TicketTSList {
    const currentTicket = this.getCurrentTicket(tickets, currentTicketId);
    if (!currentTicket) return tickets;

    const newTicket = {
      ...currentTicket,
      productsTickets: currentTicket.productsTickets.map((p) => {
        if (p.barcode === pInfo.barcode) {
          const quantity =
            pInfo.newQuantity >= 0 && pInfo.newQuantity <= p.stock
              ? pInfo.newQuantity
              : p.quantity;

          return {
            ...p,
            salePrice:
              pInfo.newSalePrice < 0 ? p.originalSalePrice : pInfo.newSalePrice,
            quantity,
            subTotal: pInfo.newSalePrice * quantity,
            currentStock: p.stock - quantity,
          };
        }

        return p;
      }),
    };

    const newTickets = tickets.map((ticket) => {
      if (ticket.id === currentTicket.id) {
        return {
          ...newTicket,
          total: newTicket.productsTickets
            .map((p) => p.subTotal)
            .reduce((a, b) => a + b, 0),
        };
      }
      return ticket;
    });

    return newTickets;
  }

  changeToWholeSalePrice(
    tickets: TicketTSList,
    currentTicketId: number,
    barcode: string
  ): TicketTSList {
    const currentTicket = this.getCurrentTicket(tickets, currentTicketId);
    if (!currentTicket) return tickets;

    currentTicket.productsTickets = currentTicket.productsTickets.map((p) => {
      if (p.barcode === barcode) {
        const newSalePrice =
          p.wholesalePrice === p.salePrice
            ? p.originalSalePrice
            : p.wholesalePrice;

        return {
          ...p,
          salePrice: newSalePrice,
          subTotal: newSalePrice * p.quantity,
        };
      }
      return p;
    });

    return tickets.map((ticket) => {
      if (ticket.id === currentTicket.id) {
        return {
          ...currentTicket,
          total: currentTicket.productsTickets
            .map((p) => p.subTotal)
            .reduce((a, b) => a + b, 0),
        };
      }
      return ticket;
    });
  }
}

export default TicketToSaleServiceImpl;
