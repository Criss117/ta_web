import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { CommonArtSchema } from "../models/schemas";
import type { CommonArtDto } from "../models/types";
import useTicketsSaleState from "../state/use.tickets-sale.state";
import TicketMapper from "../mappers/ticket.mapper";

const defaultValues: CommonArtDto = {
  quantity: 0,
  salePrice: 0,
  description: "",
  barcode: "0",
};

const useCommonArt = () => {
  const addProductToCurrentTicket = useTicketsSaleState(
    (state) => state.addProductToCurrentTicket
  );

  const form = useForm<CommonArtDto>({
    resolver: zodResolver(CommonArtSchema),
    defaultValues,
  });

  const onSubmit = form.handleSubmit((values: CommonArtDto) => {
    addProductToCurrentTicket(TicketMapper.commonArtToProductTicket(values));
    form.reset();
  });

  return {
    form,
    onSubmit,
  };
};

export default useCommonArt;
