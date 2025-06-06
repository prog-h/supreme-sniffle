import { useQuery } from "@tanstack/react-query";
import { api } from "../config/api.ts";
import { fetchInstance } from "../utils/axios.ts";
import { getServerFormatDate } from "../utils/getServerFormatDate.ts";

export const useGetDayDetails = ({ date }: { date?: Date }) => {
  const dateString = getServerFormatDate(date);

  const { data, isLoading } = useQuery({
    queryKey: [api.days(), dateString],
    queryFn: () =>
      fetchInstance({
        method: "GET",
        url: api.days(),
        params: {
          date: dateString,
        },
      }),
    enabled: !!dateString,
  });

  return { data: data?.data?.[0], isLoading };
};
