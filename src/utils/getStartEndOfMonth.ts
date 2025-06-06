import { endOfMonth, startOfMonth } from "date-fns";

export const getStartEndOfMonth = (date?: Date) => {
  if (!date) {
    return {};
  }
  return {
    from: startOfMonth(date),
    to: endOfMonth(date),
  };
};
