import { AlertDirection, alertDirections } from "../fixtures/alertDirections";
import { marketSpans, MarketSpanType } from "../fixtures/marketSpans";
import { PriceType, priceTypes } from "../fixtures/priceTypes";
import styles from "./SearchForm.module.css";

export interface SearchFilter {
  apiKey: string;
  ticker: string;
  alertPercentage: number;
  alertDirection: "up" | "down" | "both";
  alertEnabled: boolean;
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
        alert when
        <select
          value={filter.alertDirection}
          onChange={(e) =>
            setFilter("alertDirection", e.currentTarget.value as AlertDirection)
          }
        >
          {Object.entries(alertDirections).map(([value, { label }]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
        <input
          type="number"
          value={filter.alertPercentage}
          min={0}
          style={{ width: "4em" }}
          onChange={(e) =>
            setFilter("alertPercentage", e.currentTarget.valueAsNumber)
          }
        />
        percent
      </label>

      <label>
        alert enabled
        <input
          type="checkbox"
          checked={filter.alertEnabled}
          onChange={(e) => setFilter("alertEnabled", e.currentTarget.checked)}
        />
      </label>
    </div>
  );
}
