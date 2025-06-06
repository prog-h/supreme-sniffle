import { format } from "date-fns";

export const getServerFormatDate = (date?: Date) =>
  date ? format(date, "yyyy-MM-dd") : undefined;
