import {
  CircleDollarSign,
  CreditCard,
  Printer,
  ReceiptText,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import CreateDPContainer from "@/core/debt-payment/modules/create-dp/create-dp.container";
import ListDebtPaysContainer from "@/core/debt-payment/modules/list-debt-pays/list-debt-pays.container";
import SettleDebt from "./settle-debt";

const ActionsNavList = [
  {
    title: "Imprimir Estado",
    icon: Printer,
    cmp: null,
  },
  {
    title: "Imprimir Edo. Cuenta Completa",
    icon: Printer,
    cmp: null,
  },
  {
    title: "Abonar",
    icon: CircleDollarSign,
    cmp: CreateDPContainer,
  },
  {
    title: "Liquidar Adeudo",
    icon: CreditCard,
    cmp: SettleDebt,
  },
  {
    title: "Detalles de abono",
    icon: ReceiptText,
    cmp: ListDebtPaysContainer,
  },
];

interface Props {
  disabled?: boolean;
  clientId?: number;
}

const ActionsNav = ({ disabled = false, clientId }: Props) => {
  return (
    <nav className="mt-5 space-x-5">
      {ActionsNavList.map(({ title, icon: Icon, cmp: Cmp }, index) => {
        if (Cmp && !disabled && clientId) {
          return (
            <Cmp key={title + index} clientId={clientId} disabled={disabled} />
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
    </nav>
  );
};

export default ActionsNav;
