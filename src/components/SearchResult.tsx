import { useMemo } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { restClient } from "@polygon.io/client-js";
import { useNow } from "../hooks/useNow";
import { priceChange } from "../functions/priceChange";
import { fetchPriceSpan } from "../functions/fetchPriceSpan";
import { SearchFilter } from "./SearchForm";
import { useDebounceValue, useInterval } from "usehooks-ts";
import { shouldNotifyPrice } from "../fixtures/notificationCriteria";
import {
  isAppInBackground,
  sendNotification,
} from "../functions/sendNotification";
import { createMarketSpan } from "../functions/createMarketSpan";
import { targetDate } from "../fixtures/targetDate";

export function SearchResult({
  filter: inputFilter,
}: {
  filter: SearchFilter;
}) {
  const now = useNow();
  const [filter] = useDebounceValue(inputFilter, 333);
  const api = useMemo(() => restClient(filter.apiKey), [filter.apiKey]);

  const { data: holidays } = useSuspenseQuery({
    queryKey: ["holidays"],
    queryFn: () => api.reference.marketHolidays(),
  });

  const dates = useMemo(
    () =>
      createMarketSpan(
        filter.marketDays,
        targetDate.create(filter.targetDate, now),
        holidays,
      ),
    [now, filter.marketDays, filter.targetDate, holidays],
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
      <div>
        Dates: {dates.from} to {dates.to}
      </div>
      <div>
        Price: {price.from} to {price.to} (
        {formatPercentage(priceChange(price))})
      </div>

      {shouldNotify && (
        <h1 style={{ color: "red" }}>Price change matches target!</h1>
      )}
    </>
  );
}

function formatPercentage(p: number) {
  return `${Math.sign(p) ? "+" : "-"}${Math.abs(p).toFixed(2)}%`;
}
