import { Button } from "@/components/ui/button";
import {
  CircleDollarSign,
  CreditCard,
  Printer,
  ReceiptText,
} from "lucide-react";

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
}

const ActionsNav = ({ disabled = false }: Props) => {
  return (
    <nav className="mt-5 space-x-5">
      {ActionsNavList.map(({ title, icon: Icon }) => (
        <Button
          key={title}
          variant="outline"
          className="space-x-2"
          disabled={disabled}
        >
          <Icon />
          <p>{title}</p>
        </Button>
      ))}
    </nav>
  );
};

export default ActionsNav;
