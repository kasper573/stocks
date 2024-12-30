import { subDays } from "date-fns";
import { createMarketSpan } from "../functions/createMarketSpan";
import { IMarketHoliday } from "@polygon.io/client-js";
import { ISODateSpan } from "../functions/types";
import { defineOptions } from "./options";

export const marketSpan = defineOptions<
  [Date, IMarketHoliday[]],
  ISODateSpan
>()({
  yesterday: {
    label: "yesterday",
    create: (now, holidays) => createMarketSpan(subDays(now, 1), 1, holidays),
  },
  oneBusinessDay: {
    label: "one business day",
    create: (now, holidays) => createMarketSpan(now, 1, holidays),
  },
  oneBusinessWeek: {
    label: "one business week",
    create: (now, holidays) => createMarketSpan(now, 5, holidays),
  },
});

export type MarketSpanType = (typeof marketSpan.ids)[number];
