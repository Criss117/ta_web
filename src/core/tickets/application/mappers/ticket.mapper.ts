import ProductEntity from "@/core/products/domain/entities/product.entity";
import TicketEntity from "../../domain/entities/ticket.entity";
import { CommonArtDto, TicketYear } from "../models/types";

class TicketMapper {
  static domainToTicketYear(tickets: Array<TicketEntity>): TicketYear {
    return tickets.reduce((acc: TicketYear, ticket) => {
      if (!ticket.createdAt) return acc;

      const data = new Date(ticket.createdAt);
      const year = data.getFullYear();
      const month = data.getMonth();

      if (!acc[year]) {
        acc[year] = {};
      }

      if (!acc[year][month]) {
        acc[year][month] = [];
      }

      acc[year][month].push({
        id: ticket.id,
        day: data.getUTCDate(),
        dayId: data.getUTCDay(),
        total: ticket.total,
      });

      return acc;
    }, {});
  }
  static commonArtToProductTicket(commonArt: CommonArtDto): ProductEntity {
    return ProductEntity.builder()
      .barcode(commonArt.barcode)
      .description(commonArt.description)
      .salePrice(commonArt.salePrice)
      .costPrice(commonArt.salePrice)
      .wholesalePrice(commonArt.salePrice)
      .stock(commonArt.quantity)
      .minStock(commonArt.quantity)
      .isActive(true)
      .build();
  }
}

export default TicketMapper;
