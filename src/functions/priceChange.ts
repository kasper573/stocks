import { PriceSpan } from "./fetchPriceSpan";

export function priceChange({ from, to }: PriceSpan) {
  return ((to - from) / from) * 100;
}
