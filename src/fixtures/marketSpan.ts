import { subDays } from "date-fns";
import { createMarketSpan } from "../functions/createMarketSpan";
import { IMarketHoliday } from "@polygon.io/client-js";
import { ISODateSpan } from "../functions/types";

export const marketSpans = {
  yesterday: {
    label: "yesterday",
    dateSpan: (now, holidays) => createMarketSpan(subDays(now, 1), 1, holidays),
  },
  oneBusinessDay: {
    label: "one business day",
    dateSpan: (now, holidays) => createMarketSpan(now, 1, holidays),
  },
  oneBusinessWeek: {
    label: "one business week",
    dateSpan: (now, holidays) => createMarketSpan(now, 5, holidays),
  },
} satisfies Record<string, { label: string; dateSpan: DateSpanFactory }>;

export type DateSpanFactory = (
  now: Date,
  holidays: IMarketHoliday[],
) => ISODateSpan;

export type MarketSpanType = keyof typeof marketSpans;

export interface MarketSpanOption {
  value: MarketSpanType;
  label: string;
}
