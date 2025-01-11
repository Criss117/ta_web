"use client";

import {
  CircleDollarSign,
  CreditCard,
  ReceiptText,
  BookCopy,
} from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import ClientEntity from "@/core/clients/domain/entitites/client.entity";

import SettleDebt from "./settle-debt";
import DebtPaymentList from "../debt-payment/debt-payment-list";
import CreateDebtPayment from "../debt-payment/create-debt-payment";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

const ActionsNavList = [
  // {
  //   title: "Imprimir Estado",
  //   icon: Printer,
  //   cmp: null,
  // },
  // {
  //   title: "Imprimir Edo. Cuenta Completa",
  //   icon: Printer,
  //   cmp: null,
  // },
  {
    title: "Abonar",
    icon: CircleDollarSign,
    // cmp: CreateDPContainer,
    cmp: CreateDebtPayment,
  },
  {
    title: "Liquidar Adeudo",
    icon: CreditCard,
    cmp: SettleDebt,
  },
  {
    title: "Detalles de abono",
    icon: ReceiptText,
    // cmp: ListDebtPaysContainer,
    cmp: DebtPaymentList,
  },
];

interface Props {
  disabled?: boolean;
  client?: ClientEntity;
}

const ActionsNav = ({ disabled = false, client }: Props) => {
  const pathName = usePathname();

  return (
    <nav className="mt-5 space-x-5">
      <Button
        asChild
        variant="outline"
        className={cn(
          "space-x-2",
          pathName === `/clients/${client?.ccNumber}` && "border-black"
        )}
        disabled={disabled}
      >
        <Link href={`/clients/${client?.ccNumber}`}>
          <BookCopy />
          <span>Inicio</span>
        </Link>
      </Button>
      {ActionsNavList.map(({ title, icon: Icon, cmp: Cmp }, index) => {
        if (Cmp && !disabled && client) {
          return (
            <Cmp key={title + index} client={client} disabled={disabled} />
          );
        }

        return (
          <Button
            key={title}
            variant="outline"
            className="space-x-2"
            disabled={disabled}
          >
            <Icon />
            <p>{title}</p>
          </Button>
        );
      })}
      <Button
        asChild
        variant="outline"
        className={cn(
          "space-x-2",
          pathName.includes(`/clients/${client?.ccNumber}/report`) &&
            "border-black"
        )}
        disabled={disabled}
      >
        <Link href={`/clients/${client?.ccNumber}/report`}>
          <BookCopy />
          <span>Reporte</span>
        </Link>
      </Button>
    </nav>
  );
};

export default ActionsNav;
