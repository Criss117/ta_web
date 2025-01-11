import { useQuery } from "@tanstack/react-query";
import { findClientReportAction } from "../actions/find-client-report.action";

export function useFindClientReport(ccNumber: string) {
  const query = useQuery({
    queryKey: ["client-report", ccNumber],
    queryFn: () => findClientReportAction(ccNumber),
  });

  return {
    data: query.data?.data,
    isLoading: query.isLoading,
    isError: query.isError,
    isSuccess: query.isSuccess,
    isFetching: query.isFetching,
  };
}
