"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Skeleton } from "@/components/ui/skeleton";

interface Props<T> {
  data: T[];
  offset: number;
  isFetching: boolean;
  columns: ColumnDef<T, any>[];
}

function TableComponent<T>({ data, offset, isFetching, columns }: Props<T>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <Table>
      <TableHeader className="bg-lightaccent-100">
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <TableHead
                key={header.id}
                className="text-center text-black text-base"
              >
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
              </TableHead>
            ))}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody>
        {table.getRowModel().rows?.length ? (
          table.getRowModel().rows.map((row) => (
            <TableRow
              className="hover:bg-lightaccent-100/20 text-center"
              key={row.id}
              data-state={row.getIsSelected() && "selected"}
            >
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))
        ) : (
          <>
            {isFetching &&
              Array.from({ length: offset }).map((_, index) => (
                <TableRow key={index}>
                  <TableCell colSpan={columns.length} className="h-[73px]">
                    <Skeleton className="w-full h-full" />
                  </TableCell>
                </TableRow>
              ))}
            {!isFetching && data.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-[73px] text-center"
                >
                  No hay resultados
                </TableCell>
              </TableRow>
            )}
          </>
        )}
      </TableBody>
    </Table>
  );
}

export default TableComponent;
