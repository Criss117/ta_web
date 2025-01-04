import { redirect } from "next/navigation";

import { ROUTES } from "@/lib/constants/nav";
import ClientsTableScreen from "@Core/clients/presentation/screens/clients-table.screen";

interface Props {
  searchParams?: Promise<{
    page?: string;
    offset?: string;
  }>;
}

const ClientsPage = async (props: Props) => {
  const searchParams = await props.searchParams;
  if (!searchParams) {
    redirect(ROUTES.CLIENTS);
  }

  const { page, offset } = searchParams;

  const pageNumber = Number(page);
  const offsetNumber = Number(offset);

  if (
    pageNumber < 1 ||
    offsetNumber < 5 ||
    offsetNumber > 50 ||
    isNaN(pageNumber) ||
    isNaN(offsetNumber)
  ) {
    redirect(ROUTES.CLIENTS);
  }
  return <ClientsTableScreen page={pageNumber} offset={offsetNumber} />;
};

export default ClientsPage;
