import { IDailyOpenClose } from "@polygon.io/client-js";

export const priceTypes: PriceTypeOption[] = [
  {
    value: "open",
    label: "open price",
  },
  {
    value: "high",
    label: "high price",
  },
  {
    value: "low",
    label: "low price",
  },
  {
    value: "close",
    label: "close price",
  },
];

export type PriceType = Exclude<
  keyof IDailyOpenClose,
  "from" | "status" | "symbol" | "volume"
>;

export interface PriceTypeOption {
  label: string;
  value: PriceType;
}
