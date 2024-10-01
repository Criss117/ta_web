import {
  CircleDollarSign,
  CreditCard,
  Printer,
  ReceiptText,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import SettleDebt from "./settle-debt";
import DebtPaymentList from "../debt-payment/debt-payment-list";
import CreateDebtPayment from "../debt-payment/create-debt-payment";

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
  clientId?: string;
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
