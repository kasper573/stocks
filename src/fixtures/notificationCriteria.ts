import { PriceSpan } from "../functions/fetchPriceSpan";
import { priceChange } from "../functions/priceChange";
import { defineOptions } from "./options";

export const priceChangeTest = defineOptions<
  [price: PriceSpan, targetPercentage: number],
  boolean // should be true if the price span meets the target percentage
>()({
  up: {
    label: "up by",
    create: (priceSpan, targetPercentage) =>
      priceChange(priceSpan) >= Math.abs(targetPercentage),
  },
  down: {
    label: "down by",
    create: (priceSpan, targetPercentage) =>
      priceChange(priceSpan) <= -Math.abs(targetPercentage),
  },
  both: {
    label: "up or down by",
    create: (priceSpan, target) =>
      priceChange(priceSpan) >= Math.abs(target) ||
      priceChange(priceSpan) <= -Math.abs(target),
  },
});

export type PriceChangeTestType = (typeof priceChangeTest.ids)[number];

export interface NotificationCriteria {
  percentage: number;
  type: PriceChangeTestType;
}

export const defaultNotificationCriteria: NotificationCriteria = {
  percentage: 5,
  type: "both",
};

export function shouldNotifyPrice(
  price: PriceSpan,
  criteria?: NotificationCriteria,
): boolean {
  return criteria
    ? priceChangeTest.create(criteria.type, price, criteria.percentage)
    : false;
}
