import {
  NotificationCriteria,
  defaultNotificationCriteria,
  priceChangeTest,
} from "../fixtures/notificationCriteria";
import { marketSpan, MarketSpanType } from "../fixtures/marketSpan";
import { priceType, PriceType } from "../fixtures/priceType";
import styles from "./SearchForm.module.css";

export interface SearchFilter {
  apiKey: string;
  ticker: string;
  notify?: NotificationCriteria;
  marketSpan: MarketSpanType;
  price: PriceType;
}

export function SearchForm({
  value: filter,
  onChange,
}: {
  value: SearchFilter;
  onChange: (filter: SearchFilter) => void;
}) {
  function setFilter<Key extends keyof SearchFilter>(
    key: Key,
    value: SearchFilter[Key],
  ) {
    return onChange({ ...filter, [key]: value });
  }
  return (
    <div className={styles.form}>
      <label>
        polygon.io API key
        <input
          value={filter.apiKey}
          onChange={(e) => setFilter("apiKey", e.currentTarget.value)}
          type="password"
        />
      </label>

      <label>
        ticker
        <input
          value={filter.ticker}
          onChange={(e) => setFilter("ticker", e.currentTarget.value)}
          type="text"
        />
      </label>

      <label>
        market span
        <select
          value={filter.marketSpan}
          onChange={(e) =>
            setFilter("marketSpan", marketSpan.parseId(e.currentTarget.value))
          }
        >
          {marketSpan.list.map(({ id, label }) => (
            <option key={id} value={id}>
              {label}
            </option>
          ))}
        </select>
      </label>

      <label>
        price type
        <select
          value={filter.price}
          onChange={(e) =>
            setFilter("price", priceType.parseId(e.currentTarget.value))
          }
        >
          {priceType.list.map(({ label, id }) => (
            <option key={id} value={id}>
              {label}
            </option>
          ))}
        </select>
      </label>

      <label>
        <input
          type="checkbox"
          checked={!!filter.notify}
          onChange={(e) =>
            setFilter(
              "notify",
              e.currentTarget.checked ? defaultNotificationCriteria : undefined,
            )
          }
        />
        notify
        {filter.notify && (
          <>
            <span> when</span>
            <select
              value={filter.notify.type}
              onChange={(e) =>
                setFilter("notify", {
                  ...defaultNotificationCriteria,
                  ...filter.notify,
                  type: priceChangeTest.parseId(e.currentTarget.value),
                })
              }
            >
              {priceChangeTest.list.map(({ id, label }) => (
                <option key={id} value={id}>
                  {label}
                </option>
              ))}
            </select>
            <input
              type="number"
              value={filter.notify.percentage}
              min={0}
              style={{ width: "4em" }}
              onChange={(e) =>
                setFilter("notify", {
                  ...defaultNotificationCriteria,
                  ...filter.notify,
                  percentage: e.currentTarget.valueAsNumber,
                })
              }
            />
            percent
          </>
        )}
      </label>
    </div>
  );
}
