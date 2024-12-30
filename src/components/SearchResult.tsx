import { useEffect, useMemo } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { restClient } from "@polygon.io/client-js";
import { useNow } from "../hooks/useNow";
import { priceChange } from "../functions/priceChange";
import { fetchPriceSpan } from "../functions/fetchPriceSpan";
import { SearchFilter } from "./SearchForm";
import { marketSpans } from "../fixtures/marketSpans";
import { useDebounceValue, useInterval } from "usehooks-ts";
import { alertDirections } from "../fixtures/alertDirections";
import {
  isAppInBackground,
  sendNotification,
} from "../functions/sendNotification";
import { logger } from "../logger";

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
    queryKey: [filter, dates],
    queryFn: () => fetchPriceSpan(api, filter.ticker, dates, filter.price),
  });

  const alertDir = alertDirections[filter.alertDirection];
  const isAlertPrice =
    price && alertDir.isMatch(priceChange(price), filter.alertPercentage);

  function tryAlert() {
    logger.log("checking if notification should be sent");
    if (filter.alertEnabled && isAlertPrice && isAppInBackground()) {
      sendNotification("Price alert", `Price alert for ${filter.ticker}`);
    }
  }

  useInterval(tryAlert, 5000);

  return (
    <>
      <div>From date: {dates.from}</div>
      <div>To date: {dates.to}</div>
      <div>From price: {price.from}</div>
      <div>To price: {price.to}</div>
      <div>Price change: {priceChange(price).toFixed(2)}%</div>

      {isAlertPrice && (
        <h1 style={{ color: "red" }}>Alert! Price change matches target!</h1>
      )}
    </>
  );
}
