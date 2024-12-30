import { useEffect, useMemo, useState } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { restClient } from "@polygon.io/client-js";
import { useNow } from "../hooks/useNow";
import { priceChange } from "../functions/priceChange";
import { fetchPriceSpan } from "../functions/fetchPriceSpan";
import { SearchFilter } from "./SearchForm";
import { marketSpans } from "../fixtures/marketSpans";
import { useDebounceValue } from "usehooks-ts";
import { alertDirections } from "../fixtures/alertDirections";
import { Alert } from "./Alert";
import { sendNotification } from "../functions/sendNotification";

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

  const [isAlertVisible, setIsAlertVisible] = useState(false);

  useEffect(() => {
    const alertDir = alertDirections[filter.alertDirection];
    if (price && alertDir.isMatch(priceChange(price), filter.alertPercentage)) {
      sendNotification("Price alert", `Price alert for ${filter.ticker}`);
      setIsAlertVisible(true);
    }
  }, [price, filter]);

  return (
    <>
      <div>From date: {dates.from}</div>
      <div>To date: {dates.to}</div>
      <div>From price: {price.from}</div>
      <div>To price: {price.to}</div>
      <div>Change: {priceChange(price).toFixed(2)}%</div>

      {isAlertVisible && <Alert onDismiss={() => setIsAlertVisible(false)} />}
    </>
  );
}
