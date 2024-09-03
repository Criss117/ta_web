import { PropsWithChildren } from "react";
import { ROUTES } from "@/lib/constants/nav";
import { redirect } from "next/navigation";

import { TITLES } from "@/lib/constants/metadata";
import SectionHeader from "@/components/ui/section-header";
import { findClientFullnameAction } from "@/core/clients/actions/find-client-fullname.action";

interface MetadataProps {
  params: {
    ccnumber: string;
  };
}

interface Props extends PropsWithChildren {
  params: {
    ccnumber: string;
  };
}

export async function generateMetadata({ params }: MetadataProps) {
  const { ccnumber } = params;

  const fullName = await findClientFullnameAction(ccnumber);

  return {
    title: fullName,
  };
}

const ClientLayout = async ({ children, params }: Props) => {
  const { ccnumber } = params;

  const fullName = await findClientFullnameAction(ccnumber);

  if (!fullName) {
    redirect(ROUTES.CLIENTS);
  }

  return (
    <>
      <SectionHeader title={TITLES.MANAGE_CLIENT + ": " + fullName} />
      {children}
    </>
  );
};

export default ClientLayout;
