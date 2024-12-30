import { PriceSpan } from "../functions/fetchPriceSpan";
import { priceChange } from "../functions/priceChange";

export const notificationCriterias = {
  up: {
    label: "up by",
    isActive: (actual, target) => actual >= Math.abs(target),
  },
  down: {
    label: "down by",
    isActive: (actual, target) => actual <= -Math.abs(target),
  },
  both: {
    label: "up or down by",
    isActive: (actual, target): boolean =>
      notificationCriterias.up.isActive(actual, target) ||
      notificationCriterias.down.isActive(actual, target),
  },
} satisfies Record<string, NotificationCriteriaOption>;

export type NotificationCriteriaType = keyof typeof notificationCriterias;

export interface NotificationCriteriaOption {
  label: string;
  isActive: (currentPercentage: number, targetPercentage: number) => boolean;
}

export interface NotificationCriteria {
  percentage: number;
  type: NotificationCriteriaType;
}

export const defaultNotificationCriteria: NotificationCriteria = {
  percentage: 5,
  type: "up",
};

export function shouldNotifyPrice(
  price: PriceSpan,
  criteria?: NotificationCriteria,
): boolean {
  if (criteria) {
    const { percentage, type } = criteria;
    const notification = notificationCriterias[type];
    return notification.isActive(priceChange(price), percentage);
  }

  return false;
}
