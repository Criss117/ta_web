import { Button } from "@/components/ui/button";
import {
  CircleDollarSign,
  CreditCard,
  Printer,
  ReceiptText,
} from "lucide-react";
import DebtPaymentModal from "./debt-payment-modal";

const ActionsNavList = [
  {
    title: "Imprimir Estado",
    icon: Printer,
  },
  {
    title: "Imprimir Edo. Cuenta Completa",
    icon: Printer,
  },
  {
    title: "Abonar",
    icon: CircleDollarSign,
    cpm: DebtPaymentModal,
  },
  {
    title: "Liquidar Adeudo",
    icon: CreditCard,
  },
  {
    title: "Detalles de abono",
    icon: ReceiptText,
  },
];

interface Props {
  disabled?: boolean;
  clientId: number;
}

const ActionsNav = ({ disabled = false, clientId }: Props) => {
  return (
    <nav className="mt-5 space-x-5">
      {ActionsNavList.map(({ title, icon: Icon, cpm: Cpm }, index) => {
        if (Cpm && !disabled) {
          return (
            <Cpm clientId={clientId} key={title + index} disabled={disabled} />
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
