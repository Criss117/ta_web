import { format } from "@formkit/tempo";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn, formatCurrency } from "@/lib/utils";
import DebtPaymentSummaryDto from "@Core/clients/application/dto/debt-payment-summary.dto";
import DebtPaymentEntity from "@Core/clients/domain/entitites/debt-payment.entity";

interface Props {
  data: DebtPaymentEntity[];
  selectedDebtPayment: DebtPaymentSummaryDto | null;
  setSelectedDebtPayment: (selectDebtPayment: DebtPaymentSummaryDto) => void;
}

const DebtPaymentTable = ({
  data,
  selectedDebtPayment,
  setSelectedDebtPayment,
}: Props) => {
  return (
    <ScrollArea className="h-[80%] border rounded-sm">
      <Table>
        <TableHeader className="bg-lightprimary-100">
          <TableRow>
            <TableHead className="w-1/2 text-center text-black font-bold text-xl">
              Cantidad
            </TableHead>
            <TableHead className="w-1/2 text-center text-black font-bold text-xl">
              Fecha
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map((item) => (
            <TableRow
              key={item.id}
              className={cn(
                "hover:bg-lightaccent-100 transition-all cursor-pointer ",
                selectedDebtPayment?.id === item.id ? "bg-lightaccent-100" : ""
              )}
              onClick={() => {
                setSelectedDebtPayment({
                  id: item.id,
                  clientId: item.clientId,
                });
              }}
            >
              <TableCell className="text-center">
                {formatCurrency(item.amount)}
              </TableCell>
              <TableCell className="text-center">
                {format(new Date(item.createdAt || 0), "medium", "es")}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </ScrollArea>
  );
};

export default DebtPaymentTable;
