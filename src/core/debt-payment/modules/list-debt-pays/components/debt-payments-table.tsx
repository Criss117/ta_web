"use client";

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
import { DebtPayment } from "@prisma/client";
import { DeleteDebtPaymentInputType } from "@/core/debt-payment/models/type";

interface Props {
  data: DebtPayment[];
  debtPayment: DeleteDebtPaymentInputType | null;
  setDebtPayment: React.Dispatch<
    React.SetStateAction<DeleteDebtPaymentInputType | null>
  >;
}

const DebtPaymentsTable = ({ data, debtPayment, setDebtPayment }: Props) => {
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
                debtPayment?.id === item.id ? "bg-lightaccent-100" : ""
              )}
              onClick={() => {
                setDebtPayment({
                  id: item.id,
                  clientId: item.clientId,
                });
              }}
            >
              <TableCell className="text-center">
                {formatCurrency(item.amount)}
              </TableCell>
              <TableCell className="text-center">
                {format(new Date(item.createdAt), "medium", "es")}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </ScrollArea>
  );
};

export default DebtPaymentsTable;
