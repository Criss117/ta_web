"use client";

import useFindOneClient from "@/core/clients/hooks/use.find-one-client";

const useMangeClient = (ccNumber: string) => {
  const manageCLientQuery = useFindOneClient(ccNumber);

  return { manageCLientQuery };
};

export default useMangeClient;
