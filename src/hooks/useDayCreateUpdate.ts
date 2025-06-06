import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DayInterface } from "../config/types.ts";
import { fetchInstance } from "../utils/axios";
import { api } from "../config/api.ts";

export const useDayCreateUpdate = () => {
  const queryClient = useQueryClient();
  const dayCreateUpdateMutation = useMutation({
    mutationFn: ({
      id = undefined,
      data,
    }: {
      id: number | undefined;
      data: Pick<DayInterface, "slots" | "date">;
    }) =>
      fetchInstance({
        method: !id ? "POST" : "PUT",
        url: api.days(id),
        data,
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: [api.days()],
      });
      if (variables.id) {
        queryClient.invalidateQueries({
          queryKey: [api.days(variables.id as number)],
        });
      }
    },
  });

  return { dayCreateUpdateMutation };
};
