import { IMarketHoliday } from "@polygon.io/client-js";
import { formatDate } from "date-fns";
import { ISODate, ISODateSpan } from "./types";

export function createMarketSpan(
  now: Date,
  numberOfMarketDays: number,
  holidays: IMarketHoliday[],
): ISODateSpan {
  const isMarketDay = (date: Date) => {
    const day = date.getDay();
    const formattedDate = formatDate(date, "yyyy-MM-dd");
    const isHoliday = holidays.some(
      (holiday) => holiday.date === formattedDate,
    );
    return day !== 0 && day !== 6 && !isHoliday; // 0 = Sunday, 6 = Saturday
  };

  const findPreviousMarketDay = (date: Date) => {
    const previousDate = new Date(date);
    do {
      previousDate.setDate(previousDate.getDate() - 1);
    } while (!isMarketDay(previousDate));
    return previousDate;
  };

  let to = new Date(now);
  while (!isMarketDay(to)) {
    to = findPreviousMarketDay(to);
  }

  let from = new Date(to);
  for (let i = 0; i < numberOfMarketDays; i++) {
    from = findPreviousMarketDay(from);
  }

  return {
    from: formatDate(from, "yyyy-MM-dd") as ISODate,
    to: formatDate(to, "yyyy-MM-dd") as ISODate,
  };
}
