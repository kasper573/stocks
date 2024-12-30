import { useMemo } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { restClient } from "@polygon.io/client-js";
import { useNow } from "../hooks/useNow";
import { priceChange } from "../functions/priceChange";
import { fetchPriceSpan } from "../functions/fetchPriceSpan";
import { SearchFilter } from "./SearchForm";
import { marketSpans } from "../fixtures/marketSpan";
import { useDebounceValue, useInterval } from "usehooks-ts";
import { shouldNotifyPrice } from "../fixtures/notificationCriteria";
import {
  isAppInBackground,
  sendNotification,
} from "../functions/sendNotification";

export function SearchResult({
  filter: inputFilter,
}: {
  filter: SearchFilter;
}) {
  const now = useNow();
  const [filter] = useDebounceValue(inputFilter, 500);
  const api = useMemo(() => restClient(filter.apiKey), [filter.apiKey]);

  const { data: holidays } = useSuspenseQuery({
    queryKey: ["holidays"],
    queryFn: () => api.reference.marketHolidays(),
  });

  const dates = useMemo(
    () => marketSpans[filter.marketSpan].dateSpan(now, holidays),
    [now, holidays, filter.marketSpan],
  );

  const { data: price } = useSuspenseQuery({
    queryKey: [filter.apiKey, filter.ticker, dates, filter.price],
    queryFn: () => fetchPriceSpan(api, filter.ticker, dates, filter.price),
  });

  const shouldNotify = shouldNotifyPrice(price, filter.notify);

  function tryNotify() {
    if (shouldNotify && isAppInBackground()) {
      sendNotification(
        "Price alert",
        `${filter.ticker} is at ${price.to} (${priceChange(price).toFixed(2)}%)`,
      );
    }
  }

  useInterval(tryNotify, 5000);

  return (
    <>
      <div>From date: {dates.from}</div>
      <div>To date: {dates.to}</div>
      <div>From price: {price.from}</div>
      <div>To price: {price.to}</div>
      <div>Price change: {priceChange(price).toFixed(2)}%</div>

      {shouldNotify && (
        <h1 style={{ color: "red" }}>Price change matches target!</h1>
      )}
    </>
  );
}
