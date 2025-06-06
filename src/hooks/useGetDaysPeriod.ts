import { useQuery } from "@tanstack/react-query";
import { api } from "../config/api.ts";
import { fetchInstance } from "../utils/axios.ts";
import { getServerFormatDate } from "../utils/getServerFormatDate.ts";

export const useGetDaysPeriod = ({ from, to }: { from?: Date; to?: Date }) => {
  const date1 = getServerFormatDate(from);
  const date2 = getServerFormatDate(to);

  const { data, isLoading } = useQuery({
    queryKey: [api.days(), date1, date2],
    queryFn: () =>
      fetchInstance({
        method: "GET",
        url: api.days(),
        params: {
          date1,
          date2,
        },
      }),
    enabled: !!date1 && !!date2,
  });

  return { data: data?.data, isLoading };
};
