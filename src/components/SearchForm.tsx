import {
  NotificationCriteria,
  defaultNotificationCriteria,
  priceChangeTest,
} from "../fixtures/notificationCriteria";
import { priceType, PriceType } from "../fixtures/priceType";
import styles from "./SearchForm.module.css";
import { targetDate, TargetDate } from "../fixtures/targetDate";
import { OptionSelect } from "./OptionSelect";
import { defaultSearchFilter } from "../fixtures/defaultSearchFilter";
import { Dispatch, SetStateAction } from "react";

export interface SearchFilter {
  apiKey: string;
  ticker: string;
  notify?: NotificationCriteria;
  marketDays: number;
  targetDate: TargetDate;
  price: PriceType;
}

export function SearchForm({
  value: filter,
  onChange,
}: {
  value: SearchFilter;
  onChange: Dispatch<SetStateAction<SearchFilter>>;
}) {
  function setFilter<Key extends keyof SearchFilter>(
    key: Key,
    value: SearchFilter[Key],
  ) {
    return onChange((current) => ({ ...current, [key]: value }));
  }

  function resetInvalidValues() {
    if (isInvalidNumber(filter.marketDays)) {
      setFilter("marketDays", defaultSearchFilter.marketDays);
    }
    if (filter.notify && isInvalidNumber(filter.notify.percentage)) {
      setFilter("notify", {
        ...filter.notify,
        percentage: defaultNotificationCriteria.percentage,
      });
    }
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
        check
        <input
          type="number"
          value={filter.marketDays}
          min={0}
          max={999}
          onBlur={resetInvalidValues}
          onChange={(e) =>
            setFilter("marketDays", e.currentTarget.valueAsNumber)
          }
        />
        business days to
        <OptionSelect
          options={targetDate}
          value={filter.targetDate}
          onChange={(selected) => setFilter("targetDate", selected)}
        />
      </label>

      <label>
        price type
        <OptionSelect
          options={priceType}
          value={filter.price}
          onChange={(selected) => setFilter("price", selected)}
        />
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
            <OptionSelect
              options={priceChangeTest}
              value={filter.notify.type}
              onChange={(type) =>
                setFilter("notify", {
                  ...defaultNotificationCriteria,
                  ...filter.notify,
                  type: type,
                })
              }
            />
            by
            <input
              type="number"
              value={filter.notify.percentage}
              min={0}
              style={{ width: "3em" }}
              onBlur={resetInvalidValues}
              onChange={(e) =>
                setFilter("notify", {
                  ...defaultNotificationCriteria,
                  ...filter.notify,
                  percentage: e.currentTarget.valueAsNumber,
                })
              }
            />
            %
          </>
        )}
      </label>
    </div>
  );
}

function isInvalidNumber(value?: number | null) {
  return value === null || value === undefined || isNaN(value);
}
