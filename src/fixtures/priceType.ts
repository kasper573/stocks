import { defineOptions } from "./options";

export const priceType = defineOptions()({
  open: "open price",
  high: "high price",
  low: "low price",
  close: "close price",
});

export type PriceType = (typeof priceType.ids)[number];
