import { ClientReportPrimitive } from "@/core/reports/client/domain/entities/client-report.entity";
import TableComponent from "@/core/table/components/table-component";
import {
  clientDebtReportTableColumns,
  clientTicketReportTableColumns,
} from "./columns";

interface Props {
  allTickets: ClientReportPrimitive["allTickets"];
  allDebts: ClientReportPrimitive["allDebts"];
  isFetching: boolean;
}

const ClientReportTable = ({ allDebts, allTickets, isFetching }: Props) => {
  return (
    <section className="border mt-10 mx-5 py-10 rounded-xl">
      <div className="flex gap-10 w-full">
        <div className="w-1/2">
          <header className="mx-10 flex justify-between my-5">
            <h3 className="text-2xl font-bold">Reporte de saldos</h3>
          </header>
          <TableComponent
            offset={0}
            isFetching={isFetching}
            data={allTickets}
            columns={clientTicketReportTableColumns}
          />
        </div>
        <div className="w-1/2">
          <header className="mx-10 flex justify-between my-5">
            <h3 className="text-2xl font-bold">Reporte de abonos</h3>
          </header>
          <TableComponent
            offset={0}
            isFetching={isFetching}
            data={allDebts}
            columns={clientDebtReportTableColumns}
          />
        </div>
      </div>
    </section>
  );
};

export default ClientReportTable;
