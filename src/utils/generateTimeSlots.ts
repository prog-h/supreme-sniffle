import {
  setHours,
  setMinutes,
  isBefore,
  addMinutes,
  format,
  setSeconds,
  addDays,
  startOfDay,
  isSameDay,
} from "date-fns";

export const handleDateSetTime = (time: string) => {
  const timeArr = time.split(":");
  return setHours(
    setMinutes(setSeconds(new Date(), 0), Number(timeArr[1])),
    Number(timeArr[0]),
  );
};

export const generateTimeSlots = ({
  from,
  to,
  step = 15,
  isToDateList = false,
}: {
  from?: string;
  to?: string;
  step?: number;
  isToDateList?: boolean;
}) => {
  const fromAbstractDate = handleDateSetTime(from || "00:00");
  let toAbstractDate = to
    ? handleDateSetTime(to)
    : startOfDay(addDays(fromAbstractDate, 1));
  if (to === "00:00") {
    toAbstractDate = addDays(fromAbstractDate, 1);
  }
  const arr = [] as string[];
  let abstractDate = new Date(fromAbstractDate.getTime());
  while (
    isBefore(abstractDate, toAbstractDate) &&
    isSameDay(abstractDate, fromAbstractDate)
  ) {
    arr.push(format(abstractDate, "HH:mm"));
    abstractDate = addMinutes(abstractDate, step);
  }
  if (isToDateList) {
    arr.push("00:00");
  }
  return arr;
};
