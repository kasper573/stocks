import {
  NotificationCriteriaType,
  NotificationCriteria,
  defaultNotificationCriteria,
  notificationCriterias,
} from "../fixtures/notificationCriteria";
import { marketSpans, MarketSpanType } from "../fixtures/marketSpan";
import { PriceType, priceTypes } from "../fixtures/priceType";
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
            setFilter("marketSpan", e.currentTarget.value as MarketSpanType)
          }
        >
          {Object.entries(marketSpans).map(([value, { label }]) => (
            <option key={value} value={value}>
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
            setFilter("price", e.currentTarget.value as PriceType)
          }
        >
          {priceTypes.map(({ label, value }) => (
            <option key={value} value={value}>
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
                  type: e.currentTarget.value as NotificationCriteriaType,
                })
              }
            >
              {Object.entries(notificationCriterias).map(
                ([value, { label }]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ),
              )}
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
