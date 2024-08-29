"use client";

import { useEffect } from "react";
import Link from "next/link";

import { useTableState } from "../table/state/table.state";
import ClientsTableContainer from "./modules/clients-table/clients-table.container";
import { buttonVariants } from "@/components/ui/button";
import { ROUTES } from "@/lib/constants/nav";
import SearchBarQuery from "@/components/form/search-bar-query";

interface Props {
  page: number;
  offset: number;
}

const ClientsContainer = ({ page, offset }: Props) => {
  const { query, clearState, setQuery } = useTableState();

  useEffect(() => {
    return () => {
      clearState();
    };
  }, []);

  return (
    <div className="border mt-10 mx-5 py-10 rounded-xl">
      <div className="mx-10 flex justify-between">
        <SearchBarQuery
          searchByQueryFn={(query) => setQuery(query)}
          label="Nombre de cliente"
        />

        <Link
          className={buttonVariants({ variant: "default" })}
          href={ROUTES.CREATE_CLIENTS}
        >
          Crear un cliente
        </Link>
      </div>
      <ClientsTableContainer page={page} offset={offset} query={query} />
    </div>
  );
};

export default ClientsContainer;
