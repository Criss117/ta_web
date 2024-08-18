"use client";

import { useEffect } from "react";
import { useTableState } from "../table/state/table.state";
import ClientsTableContainer from "./modules/clients-table/clients-table.container";

interface Props {
  page: number;
  offset: number;
}

const ClientsContainer = ({ page, offset }: Props) => {
  const { clearState } = useTableState();

  useEffect(() => {
    return () => {
      clearState();
    };
  }, []);

  return (
    <div className="border mt-10 mx-5 py-10 rounded-xl">
      <ClientsTableContainer page={page} offset={offset} />
    </div>
  );
};

export default ClientsContainer;
