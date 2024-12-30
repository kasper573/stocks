import { subDays, startOfDay } from "date-fns";
import { defineOptions } from "./options";

export const targetDate = defineOptions<[now: Date], Date>()({
  today: {
    label: "today",
    create: (now) => startOfDay(now),
  },
  yesterday: {
    label: "yesterday",
    create: (now) => subDays(startOfDay(now), 1),
  },
});

export type TargetDate = (typeof targetDate.ids)[number];
