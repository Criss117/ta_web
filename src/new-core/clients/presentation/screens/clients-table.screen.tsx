"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import SearchBarQuery from "@/components/form/search-bar-query";
import { ROUTES } from "@/lib/constants/nav";
import { buttonVariants } from "@/components/ui/button";
import ClientsTable from "../components/clients-table/clients-table";

interface Props {
  page: number;
  offset: number;
}

const ClientsTableScreen = ({ offset, page }: Props) => {
  const [query, setQuery] = useState("");

  useEffect(() => {
    return () => {
      setQuery("");
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
      <ClientsTable page={page} offset={offset} query={query} />
    </div>
  );
};

export default ClientsTableScreen;